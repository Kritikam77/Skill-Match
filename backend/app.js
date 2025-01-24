const express=require( "express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const cors =require("cors");

dotenv.config();

const app = express();

//cors
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST","OPTIONS"],
    allowedHeaders: ["Content-Type","Authorization"],
  })
);

//middleware to parse JSON
app.use(express.json());

// routes
app.use("/api/v1", userRoutes);

module.exports=app;
