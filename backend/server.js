const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const colors = require('colors')
const connectDB = require('./config/db')
const port = process.env.PORT || 3000;

connectDB();
const app = express();

// Contents of this file should be in order

// middleware to accept body data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// our routes pointer
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// overide default error handler from Express
app.use(errorHandler)

// listening
app.listen(port, () => console.log(`Server started on port ${port}`))