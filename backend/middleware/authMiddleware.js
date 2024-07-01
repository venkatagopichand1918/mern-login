const jwt = require('jsonwebtoken');
const User = require('../models/User');
// Middleware function to verify JWT token
const protect = async (req, res, next) => {
  let token;
  // Check if authorization header with Bearer token is present
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Get user from the token
      req.user = await User.findById(decoded.id).select('-password');
      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  // If no token is found, return an error
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};
module.exports = { protect };