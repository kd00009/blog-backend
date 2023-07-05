const express = require("express");
const morgan = require("morgan");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 5000;

const connectdb = require("./config/db.JS");

dotenv.config();

// router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// mogodb connection
connectdb();

const cors = require("cors");
const mongoose = require("mongoose");

const colors = require("colors");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

// listen
app.listen(port, () => {
  console.log(`Server running on port ${port}`.bgBlue.black);
});
