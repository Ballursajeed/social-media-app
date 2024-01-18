const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken')

exports.isAuthenticated = async(req,res,next) => {

  try {

       //const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWE5NWNiNWFkMDQzY2Y4NWRmMjFmNDMiLCJpYXQiOjE3MDU1OTgxMzN9.2BuUs_YsoZbkJALcpep1FzoA13Bzs3BZezG1CWiwtto"
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