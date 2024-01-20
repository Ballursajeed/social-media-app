const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require('cors');

 if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config({path:"config.env"})
 }

 //middlewares
 app.use(express.json());
 app.use(express.urlencoded({ extended:true }));
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these HTTP methods
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(cookieParser());

 //importing routes
 const postRoute = require("./routes/post.route.js");
 const userRoute = require("./routes/user.route.js");

 //usind routes
 app.use('/api/v1/post',postRoute);
 app.use('/api/v1/user',userRoute);

module.exports = app;