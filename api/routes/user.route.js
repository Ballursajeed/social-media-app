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
        getAllUsers,
        forgetPassword,
        resetPassword,
        getMyPosts } = require('../controllers/user.controller.js')
const { isAuthenticated } = require('../middlewares/auth.js')

const router = express.Router();

 router.route('/register').post(Register);
 router.route('/login').post(Login);
 router.route('/logout').get(logout);
 router.route('/follow/:id').get(isAuthenticated,followingUser);
 router.route('/update/password').put(isAuthenticated,updatePassword);
 router.route('/update/profile').put(isAuthenticated,updateProfile);
 router.route('/me').get(isAuthenticated,myProfile);
 router.route('/my/posts').get(isAuthenticated,getMyPosts);
 router.route('/delete/me').delete(isAuthenticated,deleteMyProfile);
 router.route('/user/:id').get(isAuthenticated,getUserProfile);
 router.route('/users').get(isAuthenticated,getAllUsers);
 router.route('/forgot/password').post(forgetPassword);
 router.route('/password/reset/:token').put(resetPassword);

module.exports = router;