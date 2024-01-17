const express = require('express');
const  { createPost, likeAndUnlikePost, deletePost } = require('../controllers/post.controller.js');
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/upload').post(isAuthenticated,createPost);
 router.route('/:id').get(isAuthenticated,likeAndUnlikePost);
 router.route('/delete/:id').delete(isAuthenticated,deletePost);

module.exports = router;