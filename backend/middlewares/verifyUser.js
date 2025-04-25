const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization header not found" });
  }
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token expired" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = verifyUser;
