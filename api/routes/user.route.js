const express = require('express');
const { Register,
        Login,
        followingUser,
        logout,
        updatePassword,
        updateProfile,
        deleteMyProfile,
        myProfile,
        getUserProfile,
        getAllUsers } = require('../controllers/user.controller.js')
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/register').post(Register);
 router.route('/login').post(Login);
 router.route('/logout').get(logout);
 router.route('/follow/:id').get(isAuthenticated,followingUser);
 router.route('/update/password').put(isAuthenticated,updatePassword);
 router.route('/update/profile').put(isAuthenticated,updateProfile);
 router.route('/me').get(isAuthenticated,myProfile);
 router.route('/delete/me').delete(isAuthenticated,deleteMyProfile);
 router.route('/user/:id').get(isAuthenticated,getUserProfile);
 router.route('/users').get(isAuthenticated,getAllUsers);

module.exports = router;