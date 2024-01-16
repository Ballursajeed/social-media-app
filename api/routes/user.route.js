const express = require('express');
const Register = require('../controllers/user.controller.js')

const router = express.Router();

 router.route('/register').post(Register)

module.exports = router;