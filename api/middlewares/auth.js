const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async(req,res,next) => {

  try {

       //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE4MDk4NzhlMWU0OGExMTE1NTEyNDQiLCJpYXQiOjE3MDU1MTEzMDR9.1_-0Q3p-7C-5NjALkBV9ODGJCEwAkUbSTYuNghRCyxY"
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