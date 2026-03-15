const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// Connect database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/resumes", resumeRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend working properly");
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
