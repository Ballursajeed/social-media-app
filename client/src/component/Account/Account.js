import React from "react";
import "./Account.css"
import { useDispatch,useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/User";
import Loader from "../Loader/Loader"
import Post from "../Post/Post";
import { Typography, Avatar, Button }  from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const Account = () => {

 const dispatch = useDispatch();

 const { user,loading:userLoading } = useSelector((state) => state.user);
 const { loading, error, posts } = useSelector((state) => state.myPosts);
 const {error:likeError,message} = useSelector((state) => state.like);

 React.useEffect(() => {
     dispatch(getMyPosts())
 },[dispatch])

 React.useEffect(() => {

   if (error) {
     toast.error(error);
     dispatch({
       type:"clearError"
       })
    }

   if (likeError) {
     toast.error(likeError);
     dispatch({
       type:"clearError"
      })
    }

   if (message) {
    toast.success(message);
    dispatch({
        type:"clearMessage"
    })
   }

 },[error,message,likeError,dispatch])

 return(
  <>
  <ToastContainer />
     { loading === true || userLoading === true ?  <Loader /> :
      <div className='account'>
        <div className='accountleft'>
             {
                posts && posts.length > 0 ? posts.map((post) => (
               <Post
                key={post._id}
                      postId={post._id}
                      caption={post.caption}
                      postImage={post.image.url}
                      likes = {post.likes}
                      comments = {post.comments}
                      ownerImage = {post.owner.avatar?.url}
                      ownerName = {post.owner.name}
                      ownerId = {post.owner._id}
                  />
                )) : <Typography variant="h6">You Have not made any Post</Typography>

             }
        </div>
        <div className='accountright'>
           <Avatar src={user.avatar.url}
                  sx={{ height: "8vmax", width: "8vmax" }} />
           <Typography variant="h5">{user.name}</Typography>
           <div>
             <button>
              <Typography>Followers</Typography>
             </button>
               <Typography>{user.followers.length}</Typography>
           </div>
           <div>
             <button>
              <Typography>Following</Typography>
             </button>
               <Typography>{user.following.length}</Typography>
           </div>
           <div>
              <Typography>Post</Typography>
              <Typography>{user.posts.length}</Typography>
            </div>
            <Button variant="contained">Logout</Button>

            <Link to='/update/profile'>Edit Profile</Link>
            <Link to='/update/password'>Change Password</Link>

            <Button
                 variant="text"
                 style={{ color: "red", margin: "2vmax" }}    >
               Delete My Profile
            </Button>

        </div>
      </div>
     }
  </>
 )
}

export default Account