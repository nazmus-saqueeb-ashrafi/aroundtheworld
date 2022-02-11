const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;

const app = express();

// our route pointer
app.use("/api/posts", require("./routes/postRoutes"));

// listening
app.listen(port, () => console.log(`Server started on port ${port}`))