// const jwt = require('jsonwebtoken');
const { getUser } = require("../services/auth");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = getUser(token);
  if (!user) return res.json({ error: "user not found second step" });
  req.user = user;
  console.log(req.user);

  console.log("hello from authenticate token");
  next();
};

module.exports = authenticateToken;
