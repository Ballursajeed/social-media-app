const express = require('express');
const { Register,Login,followingUser } = require('../controllers/user.controller.js')
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/register').post(Register);
 router.route('/login').post(Login);
 router.route('/follow/:id').get(isAuthenticated,followingUser);

module.exports = router;