const User = require('../models/user.model.js');
const Post = require('../models/post.model.js');
const { sendEmail } = require("../middlewares/sendEmail.js");
const crypto = require("crypto");

exports.Register = async(req,res) => {
       try {

         const {name,email,password} = req.body;

         let user = await User.findOne({email});
         if (user) {
              return res.status(400).json({
                 success:false,
                 message:"User already exists"
              });
         }

         user = await User.create({
                 name,
                 email,
                 password,
                 avatar:{
                   public_id:'sample_id',
                   url:"sample url"
                 }
         })

         const token = await user.generateToken();

        res
         .status(201)
         .cookie("token",token,
          {expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly:true
         })
         .json({
              success:true,
              message:"User Registered successfully",
              user,
              token
        })
       } catch (error) {
       	res
       	 .status(500)
       	 .json({
                success:false,
                message:error.message
       	})
       }
}

 exports.Login = async(req,res) => {
      try {

        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
             return res
                       .status(400)
                       .json({
                            success:false,
                            message:"User does not exist"
                       });
        }

        const isMatch = await user.mathPassword(password);

        if (!isMatch) {
             return res
                       .status(400)
                       .json({
                            success:false,
                            message:"Incorrect password"
                       });
        }

            const token = await user.generateToken();

           console.log("Login successfully")

        res
         .cookie('token',token,{sameSite:'none',secure:true})
         .status(200)
         .json({
              success:true,
              message:"User logged successfully",
              user,
              token
        })

      } catch (error) {
               res
                .status(500)
                .json({
                        success:false,
                        message:error.message
                })
      }
 }

 exports.logout = async(req,res) => {
      try {

         res.status(200).cookie("token", null,{expires: new Date(Date.now()),httpOnly:true}).json({
                     success:true,
                     message:"Logged Out"
         })

      } catch (error) {
                 res
                .status(500)
                .json({
                        success:false,
                        message:error.message
                })
      }
 }

 exports.followingUser = async(req,res) => { //follow and unfollow
              try {

                   const userToFollow = await User.findById(req.params.id);
                   const loggedInUser = await User.findById(req.user._id);

                   if (!userToFollow) {
                           return res.status(404).json({
                                success:false,
                                message:"User not found!"
                           })
                   }


                 if (loggedInUser.following.includes(userToFollow._id)) {
                 	         const indexFollowing = loggedInUser.following.indexOf(userToFollow._id);
                           loggedInUser.following.splice(indexFollowing,1);

                           const indexFollower = userToFollow.followers.indexOf(loggedInUser._id);
                           userToFollow.followers.splice(indexFollowing,1);

                           await loggedInUser.save();
                           await userToFollow.save();

                       res.status(200).json({
                        success:true,
                        message:"User Unfollowed"
                })

                 } else {
                loggedInUser.following.push(userToFollow._id);
                userToFollow.followers.push(loggedInUser._id);

                await loggedInUser.save();
                await userToFollow.save();

                res.status(200).json({
                        success:true,
                        message:"User followed"
                })
                 }

              } catch (error) {
                       res.status(500).json({
                            success:false,
                            message:error.message
                       })
              }
 }

exports.updatePassword = async(req,res) => {
         try {

          const user = await User.findById(req.user._id).select("+password");

          const { oldPassword, newPassword } = req.body;

          if (!oldPassword || !newPassword) {
                return res.status(400).json({
                    success:false,
                    message:"Please provide old and new password"
                })
          }

          const isMatch = await user.mathPassword(oldPassword);

          if (!isMatch) {
               return res.status(400).json({
                   success:false,
                   message:"Incorrect Old Password"
               })
          }

          user.password = newPassword;
          await user.save();

          res.status(200).json({
              success:true,
              message:"Password updated"
          	})

         } catch (error) {
                     res.status(500).json({
                            success:false,
                            message:error.message
                       })
         }
}


exports.updateProfile = async(req,res) => {
      try {

        const user = await User.findById(req.user._id);

        const { name, email} = req.body;

        if (name) {
          user.name = name;
        }

        if (email) {
              user.email = email;
        }

        //user avatar todo

        await user.save();

        res.status(200).json({
             success:true,
             message:"Profile Updated"
        })

      } catch (error) {
        res.
               status(500)
               .json({
                     success:false,
                     message:error.message
                       })
      }
}

exports.deleteMyProfile = async(req,res) => {
      try {

          const user = await User.findById(req.user._id);
          console.log(user);
          const posts = user.posts;
          const followers = user.followers;
          const following = user.following;
          const userId = user._id;

          await User.findByIdAndDelete(user._id)

          //logout user after deleting
         res.cookie("token", null,{expires: new Date(Date.now()),httpOnly:true});

          for (let i = 0; i<posts.length; i++) { //deleting all posts of user
             await Post.findByIdAndDelete(posts[i]);
          }
          //removing users from followers following
          for (let i = 0; i<followers.length; i++) {
            const follower = await User.findById(followers[i]);

            const index = follower.following.indexOf(userId);
            follower.following.splice(index, 1);
            await follower.save();
          }

           //removing users from following's followers
          for (let i = 0; i<following.length; i++) {
            const follows = await User.findById(following[i]);

            const index = follows.followers.indexOf(userId);
            follows.followers.splice(index, 1);
            await follows.save();
          }

     res.status(200).json({
           success:true,
           message:"Profile Deleted"
     })

      } catch (error) {
               res
               .status(500)
               .json({
                     success:false,
                     message:error.message,
                     error
                       })
      }
}

 exports.myProfile = async(req,res) => {
       try {

        const user = await User.findById(req.user._id).populate("posts");

        res.status(200).json({
             success:true,
             user,
        })

       } catch (error) {
              res
               .status(500)
               .json({
                     success:false,
                     message:error.message,
                       })
       }
 }


exports.getUserProfile = async(req,res) => {
       try {

           const user = await User.findById(req.params.id).populate('posts');

           if (!user) {
                 return res.status(404).json({
                     success:false,
                     message:"User not found!"
                 })
           }

           res.status(200).json({
                   success:true,
                   user,
           })

       } catch (error) {
              res.status(500).json({
                    success:false,
                    message:error.message
              })
       }
}

exports.getAllUsers = async(req,res) => {
        try {

            const users = await User.find({});

            res.status(200).json({
                    success:true,
                    users
            })

        } catch (error) {
               res.status(500).json({
                    success:false,
                    message:error.message
              })
        }
}

 exports.getMyPosts = async(req,res) => {
        try {

            const user = await User.findById(req.user.id);

           const posts = [];

           for (let i=0;i<user.posts.length;i++) {
              const post = await Post.findById(user.posts[i]).populate("likes comments.user");
              posts.push(post);
           }

            res.status(200).json({
                    success:true,
                    posts
            })

        } catch (error) {
               res.status(500).json({
                    success:false,
                    message:error.message
              })
        }

}

exports.forgetPassword = async(req,res) => {
      try {

       const user = await User.findOne({email:req.body.email});

       if (!user) {
           return res.status(404).json({
                 success:false,
                 message:"User not found"
           });
       }

          const resetPasswordToken = user.getResetPasswordToken();

          await user.save();

          const resetUrl = `${req.protocol}://${req.get("host")}/api/v1/user/password/reset/${resetPasswordToken}`;
          const message = `Reset your password by clicking on the link: ${resetUrl}`;

          try {

           	await sendEmail({
           		email:user.email,
           		subject:"Reset Password",
           		message,
           		});

           		res.status(200).json({
                     success:true,
                     message:`Email sent to ${user.email}`,
           		})

          }catch (error) {

              user.resetPasswordToken = undefined;
              user.resetPasswordExpire = undefined;
              await user.save();

              res.status(500).json({
                   success:false,
                   message:error.message
              });

          }



      } catch (error) {
               res.status(500).json({
                    success:false,
                    message:error.message
              })
        }
}

exports.resetPassword = async(req,res) => {
 try {

   const resetPasswordToken = crypto
                             .createHash("sha256")
                             .update(req.params.token)
                             .digest("hex");

   const user = await User.findOne({resetPasswordToken,
                                    resetPasswordExpire:{ $gt: Date.now() },
                                    });
   if (!user) {
        return res.status(401).json({
             success:false,
             message:"Token is Invalid or has expired"
        });
   }

   user.password = req.body.password;

   user.resetPasswordToken = undefined;
   user.resetPasswordExpire = undefined;

   await user.save();

   res.status(200).json({
            sucess:true,
            message:"Password updated successfully"
   })

 } catch (error) {
               res.status(500).json({
                    success:false,
                    message:error.message
              })
        }
}