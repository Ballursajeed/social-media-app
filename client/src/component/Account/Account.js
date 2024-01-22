import React from "react";
import "./Account.css"
import { useDispatch,useSelector } from "react-redux";
import { getMyPosts } from "../../Actions/User";
import Loader from "../Loader/Loader"
import Post from "../Post/Post";
import { Typography }  from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Account = () => {

 const dispatch = useDispatch();

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
     {
      loading ? <Loader /> :
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
                )) : <Typography variant="h6">No Post Yet</Typography>

             }
        </div>
        <div className='accountright'>

        </div>
      </div>
     }
  </>
 )
}

export default Account