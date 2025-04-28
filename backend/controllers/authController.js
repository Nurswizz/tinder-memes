const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const likedMemes = [];
  const dislikedMemes = [];
  const savedMemes = [];

  if (!username || !password || !email) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await db.collection("users").findOne({ username: username.toLowerCase() });
  if (user) {
    console.log("Username already exists");
    return res.status(400).json({ message: "Username already exists" });
  }
  const emailExists = await db.collection("users").findOne({ email: email.toLowerCase() });

  if (emailExists) {
    console.log("Email already exists");
    return res.status(400).json({ message: "Email already exists" });
  }

  await db
    .collection("users")
    .insertOne({
      username,
      hashedPassword,
      email,
      likedMemes,
      dislikedMemes,
      savedMemes,
    });
  return res.status(201).json({ message: "User created" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email: email.toLowerCase() });

  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const validPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    token,
    message: "Logged in",
    user: { id: user._id, username: user.username },
  });
};

module.exports = {
  register,
  login,
};
