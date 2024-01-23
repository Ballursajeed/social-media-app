import React from "react";
import "./NewPost.css";
import {Typography, Button} from "@mui/material";

const NewPost = () => {

 const [image,setImaga] = React.useState(null);
 const [caption,setCaption] = React.useState("");

 const handleImageChange = (e) => {
     const file = e.target.files[0];
 }

 return (
 <>
  <div className='newPost'>
    <form className='newPostForm'>
       <Typography variant='h3'>New Post</Typography>

       { image && <img src={image} alt="post" /> }

        <input type="file" accept="image/*" onChange={handleImageChange}/>
        <input
          type="text"
          placeholder="Caption...."
          value={caption} onchange={(e) => setCaption(e.target.value)}
        />
        <Button type="submit">
          Post
        </Button>
    </form>
  </div>
 </>
 )
}

export default NewPost