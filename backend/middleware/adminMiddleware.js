// middleware/adminMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware to protect admin routes
const adminProtect = async (req, res, next) => {
  let token;

  // Check if token exists in the Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.SECRET);

      // Check if it's an admin token
      if (decoded.role !== 'admin') {
        res.status(403).json({ error: 'Not authorized, admin access required' });
        return;
      }

      // Store admin info in request
      req.admin = decoded;

      next();
    } catch (error) {
      console.error('Admin authentication error:', error.message);
      res.status(401).json({ error: 'Not authorized, invalid token' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token provided' });
  }
};

module.exports = { adminProtect };