const express = require('express');
const createPost = require('../controllers/post.controller.js');
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/upload').post(isAuthenticated,createPost);

module.exports = router;