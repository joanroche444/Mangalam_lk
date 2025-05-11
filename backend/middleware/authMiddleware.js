const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]; // Get token from header
            // Verify token
            const decoded = jwt.verify(token, process.env.SECRET);

            req.user = await User.findById(decoded._id).select('-password'); // Get user from token

            if(!req.user){
                 res.status(401);
                 throw new Error('User not found');
            }
            next();
        }catch (error) {
            console.error('Authentication error:', error.message);
            res.status(401).json({ error: 'Not authorized, invalid token' });
        }
    }

    if(!token){
        res.status(401);
        throw new Error('Not authorized, no token');
    }
};


// Middleware to check if user is an admin
const isAdmin = (req, res, next) => {
    if(req.user && req.user.role === 'admin'){
        next();
    }else{
        res.status(403).json({ error: 'Access denied, admin only' });
    }
}

// Middleware to check if user has vendor role
const isVendor = (req, res, next) => {
    if (req.user && (req.user.role === 'vendor' || req.user.role === 'admin')) {
      next();
    } else {
      res.status(403).json({ error: 'Not authorized, vendor access required' });
    }
  };

// Middleware to check if user is a couple
const isCouple = (req, res, next) => {
    if (req.user && req.user.role === 'couple') {
      next();
    } else {
      res.status(403).json({ error: 'Not authorized, couple access required' });
    }
  };

module.exports = {
    protect,
    isAdmin,
    isVendor,
    isCouple };