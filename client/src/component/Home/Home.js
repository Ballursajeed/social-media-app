import React from "react";
import "./Home.css"
import User from "../User/User";
import Post from "../Post/Post";
import { useDispatch, useSelector } from "react-redux";
import { getFollowingPost,getAllUsers } from "../../Actions/User";
import Loader from "../Loader/Loader"
import { Typography }  from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {

 const dispatch = useDispatch();

 const {error:likeError,message} = useSelector((state) => state.like);

 const { loading,posts,error } = useSelector(state => state.postOfFollowing)

 const { users,loading:usersLoading } = useSelector((state) => state.allUsers);

 React.useEffect(() => {

 dispatch(getFollowingPost())
 dispatch(getAllUsers())

 },[]);



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

 },[error,message])



 return(
 <>
      <ToastContainer />
      {
          loading === true || usersLoading === true ? <Loader /> : (
      <div className='home'>
       <div className='homeleft'>
          {
               posts && posts.length > 0 ? posts.map((post) => (
                <Post
                key={post._id}
                      postId={post._id}
                      caption={post.caption}
                      postImage={post.image.url}
                      likes = {post.likes}
                      comments = {post.comments}
                      ownerImage = {post.owner.avatar.url}
                      ownerName = {post.owner.name}
                      ownerId = {post.owner._id}
                  />
               )) : <Typography variant="h6">No Post Yet</Typography>
          }
       </div>
       <div className='homeright'>
         {
            users && users.length > 0 ? users.map((user) => ((
         <User
              key={user._id}
              userId={user._id}
              name={user.name}
              avatar={user.avatar.url}
              />
            ))) : (<Typography variant="h6" >No Users Yet</Typography>)
         }
       </div>
   </div>
      )
      }

      </>
 )
}

export default Home