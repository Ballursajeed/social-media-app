import React from "react";
import "./Post.css"
import { Avatar, Typography, Button }  from "@mui/material";
import { Link } from "react-router-dom";
import {
  MoreVert,
  Favorite,
  FavoriteBorder,
  ChatBubbleOutline,
  DeleteOutline,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { likePost } from "../../Actions/Post"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Post  = ({
   postId,
   caption,
   postImage,
   likes = [],
   comments = [],
   ownerImage,
   ownerName,
   ownerId,
   isDelete = false,
   isAccount = false,
}) => {

 const [liked,setLiked] = React.useState(false);

 const {error,message} = useSelector((state) => state.like);

 const dispatch = useDispatch()

 const handleLike = () => {
      setLiked(!liked);
      dispatch(likePost(postId));

 };

 React.useEffect(() => {

 if (error) {
     toast.error(error)
 }
  if (message) {
  toast.success(message, {
    position: "top",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  }

 },[error,message])

 return(
     <>
    <ToastContainer />
      <div className='post'>
        <div className='postHeader'>
            {isAccount ? <Button>
                     <MoreVert />
            </Button> : null}
        </div>

        <img src={postImage} alt='post' />

        <div className='postDetails'>
           <Avatar src={ownerImage} alt='User' sx={{
           	height:"3vmax",
            width:"3vmax",
           	}}/>
           	<Link to={`/user/${ownerId}`} >
              <Typography fontWeight={700} >{ownerName}</Typography>
           	</Link>
           	<Typography
           	     fontWeight={100}
                 color="rgba(0,0,0,0.582)"
                 style={{alignSelf:"center"}}
           	     >
           	 {caption}
           	</Typography>
        </div>
        <button style={{
          border: "none",
          backgroundColor: "white",
          cursor: "Pointer",
          margin: "1vmax 2vmax",
        }}>
            <Typography>5 Likes</Typography>
        </button>
        <div className='postFooter'>
            <Button onClick={handleLike}>
              {
                 liked ? <Favorite style={{color:"red"}}/> :  <FavoriteBorder />
              }
            </Button>
             <Button>
               <ChatBubbleOutline />
            </Button>
               {
                   isDelete ?  <Button>
               <DeleteOutline />
            </Button>  : null
               }
        </div>
      </div>
     </>
 )
}

export default Post;