const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async(req,res,next) => {

  try {

       // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE2NmJlYjNiMTAxMTIzYTQ1YTJmMDMiLCJpYXQiOjE3MDU0MDY5ODN9.-dTygxDkaB_Z2EVpcuNCgPBVq0ryNz4NWazuyfR1rxI'
        const { token } = req.coookies;
        if (!token) {
              return res
             .status(401)
             .json({
                 message:"Please Login first"
              });
             }

  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded._id);

  next();

  } catch (error) {
      res.status(500).json({
            message:error.message,
      })
  }


}