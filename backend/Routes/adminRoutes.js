// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { adminProtect } = require('../middleware/adminMiddleware');
const {
  adminLogin,
  verifyAdmin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/adminController');

const { getUserReports } = require('../controllers/reportController');

// Public admin routes
router.post('/login', adminLogin);

// Protected admin routes
router.get('/verify', adminProtect, verifyAdmin);
router.get('/users', adminProtect, getAllUsers);
router.get('/users/:id', adminProtect, getUserById);
router.patch('/users/:id', adminProtect, updateUser);
router.delete('/users/:id', adminProtect, deleteUser);

// Report routes
router.get('/report/users', adminProtect, getUserReports);

module.exports = router;