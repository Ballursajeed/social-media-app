const express = require('express');
const  { createPost, likeAndUnlikePost } = require('../controllers/post.controller.js');
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/upload').post(isAuthenticated,createPost);
 router.route('/:id').get(isAuthenticated,likeAndUnlikePost);

module.exports = router;