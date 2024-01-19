const express = require('express');
const  { createPost,
         likeAndUnlikePost,
         deletePost,
         getPostOfFollowing,
         updatePost,
         addComment } = require('../controllers/post.controller.js');
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/upload').post(isAuthenticated,createPost);
 router.route('/:id').get(isAuthenticated,likeAndUnlikePost);
 router.route('/delete/:id').delete(isAuthenticated,deletePost);
 router.route('/update/:id').put(isAuthenticated,updatePost);
 router.route('/').get(isAuthenticated,getPostOfFollowing);
 router.route('/comment/:id').put(isAuthenticated,addComment);

module.exports = router;