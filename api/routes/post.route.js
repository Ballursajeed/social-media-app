const express = require('express');
const createPost = require('../controllers/post.controller.js');

const router = express.Router();

 router.route('/upload').post(createPost);

module.exports = router;