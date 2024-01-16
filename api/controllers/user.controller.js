const User = require('../models/user.model.js');

exports.Register = async(req,res) => {
       try {

         const {name,email,password} = req.body;

           console.log(name,email);

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

        res
         .status(200)
         .cookie("token",token,
          {expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          httpOnly:true
         })
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


