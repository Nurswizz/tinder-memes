const { db } = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { username, password, email } = req.body;
  const role = "user";
  const rank = "E";
  const xp = 0;
  const skills = [];
  if (!username || !password || !email) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await db.collection("users").findOne({ username });
  if (user) {
    console.log("Username already exists");
    return res.status(400).json({ message: "Username already exists" });
  }
  const emailExists = await db.collection("users").findOne({ email });

  if (emailExists) {
    console.log("Email already exists");
    return res.status(400).json({ message: "Email already exists" });
  }

  await db
    .collection("users")
    .insertOne({ username, hashedPassword, email, role, rank, skills, xp });
  res.status(201).json({ message: "User created" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await db.collection("users").findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }

  const validPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!validPassword) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res.status(200).json({
    token,
    message: "Logged in",
    user: { id: user.id, username: user.username, rank: user.rank },
  });
};

module.exports = {
  register,
  login,
};
