require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/authRoutes");
const memeRoutes = require("./routes/memeRoutes");
const userRouter = require("./routes/userRoutes");

// Database connection
const { run } = require("./config/db");
run();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/meme", memeRoutes);
app.use("/api/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});