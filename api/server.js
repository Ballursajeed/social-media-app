const app = require('./app.js');
const connectDB = require('./db/db.js');

//mongo db connection
connectDB()

app.listen(process.env.PORT,() => console.log("Server is running on PORT:",process.env.PORT))