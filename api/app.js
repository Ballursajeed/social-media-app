const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

 if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config({path:"config.env"})
 }

 //middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended:true }));
 app.use(cookieParser);

 //importing routes
 const postRoute = require("./routes/post.route.js");
 const userRoute = require("./routes/user.route.js");

 //usind routes
 app.use('/api/v1/post',postRoute);
 app.use('/api/v1/user',userRoute);

module.exports = app;