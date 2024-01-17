const express = require('express');
const { Register,Login,followingUser, logout,updatePassword, updateProfile, deleteMyProfile } = require('../controllers/user.controller.js')
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/register').post(Register);
 router.route('/login').post(Login);
 router.route('/logout').get(logout);
 router.route('/follow/:id').get(isAuthenticated,followingUser);
 router.route('/update/password').put(isAuthenticated,updatePassword);
 router.route('/update/profile').put(isAuthenticated,updateProfile);
 router.route('/delete/me').delete(isAuthenticated,deleteMyProfile);

module.exports = router;