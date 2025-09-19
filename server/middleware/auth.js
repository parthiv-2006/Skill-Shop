require("dotenv").config()
const jwt = require('jsonwebtoken');

// Middleware to protect routes
module.exports = function (req, res, next) {

  const authHeader = req.headers['authorization'];
  
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to request object
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
