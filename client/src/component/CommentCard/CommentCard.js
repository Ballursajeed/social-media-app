import React from "react";
import "./CommentCard.css"
import { Link } from "react-router-dom";
import { Typography, Button}  from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment } from "../../Actions/Post";

const CommentCard = ({
 userId,
 name,
 avatar,
 comment,
 commentId,
 postId,
 isAccount,
}) => {

  const { user } = useSelector(state => state.user);

 const dispatch = useDispatch();

 const deleteCommentHandler = () => {
           console.log("Delete comment");
           dispatch(deleteComment(postId,commentId))
 }

 return(
  <>
   <div className='commentUser'>
    <Link to={`/user/${userId}`}>
       <img src={avatar} alt={name}/>
        <Typography style={{ minWidth: "6vmax" }}>{name}</Typography>
    </Link>
      <Typography>
         {comment}
      </Typography>

           {
               isAccount ? ( <Button onClick={deleteCommentHandler}>
                                 <Delete />
                             </Button> ) : userId === user._id ? (
                             <Button onClick={deleteCommentHandler}>
                                 <Delete />
                             </Button> ) : null
           }

   </div>
  </>
 )
}

export default CommentCard;