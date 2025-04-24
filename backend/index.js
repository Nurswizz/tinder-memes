require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes");

// Database connection
const { run } = require("./config/db");
run();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);

app.listen(PORt, () => {
    console.log(`Server is running on port ${PORT}`);
});