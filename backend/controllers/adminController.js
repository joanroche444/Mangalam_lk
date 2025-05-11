const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const ADMIN_EMAIL = 'admin@mangalam.lk';
const ADMIN_PASSWORD = 'admin123';

const adminLogin = async (req, res) => {
    try {
        const { email, password} = req.body;

        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {

            const token = jwt.sign(
                { id: 'admin' , role: 'admin' },
                process.env.SECRET,
                { expiresIn: '3d' }
            )
            res.status(200).json({
                name: 'Admin',
                email: ADMIN_EMAIL,
                token
              });
            } else {
              res.status(401).json({ error: 'Invalid admin credentials' });
            }
          } catch (error) {
            console.error('Admin login error:', error);
            res.status(500).json({ error: 'Server error during login' });
          }
        };
        
        // Verify admin token
        const verifyAdmin = async (req, res) => {
          try {
            res.status(200).json({ message: 'Admin token is valid' });
          } catch (error) {
            console.error('Admin verification error:', error);
            res.status(500).json({ error: 'Server error during verification' });
          }
        };
        
        // Get all users for admin
        const getAllUsers = async (req, res) => {
          try {
            const users = await User.find().select('-password').sort({ createdAt: -1 });
            res.status(200).json(users);
          } catch (error) {
            console.error('Get all users error:', error);
            res.status(500).json({ error: 'Server error while fetching users' });
          }
        };
        
        // Get user by ID
        const getUserById = async (req, res) => {
          try {
            const { id } = req.params;
            const user = await User.findById(id).select('-password');
            
            if (!user) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            res.status(200).json(user);
          } catch (error) {
            console.error('Get user error:', error);
            res.status(500).json({ error: 'Server error while fetching user' });
          }
        };
        
        // Update user
        const updateUser = async (req, res) => {
          try {
            const { id } = req.params;
            const updates = req.body;
            
            // Prevent updating password through this route
            if (updates.password) {
              delete updates.password;
            }
            
            const updatedUser = await User.findByIdAndUpdate(
              id, 
              updates, 
              { new: true, runValidators: true }
            ).select('-password');
            
            if (!updatedUser) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            res.status(200).json(updatedUser);
          } catch (error) {
            console.error('Update user error:', error);
            res.status(500).json({ error: 'Server error while updating user' });
          }
        };
        
        // Delete user
        const deleteUser = async (req, res) => {
          try {
            const { id } = req.params;
            const deletedUser = await User.findByIdAndDelete(id);
            
            if (!deletedUser) {
              return res.status(404).json({ error: 'User not found' });
            }
            
            res.status(200).json({ message: 'User deleted successfully' });
          } catch (error) {
            console.error('Delete user error:', error);
            res.status(500).json({ error: 'Server error while deleting user' });
          }
        };
        
        module.exports = {
          adminLogin,
          verifyAdmin,
          getAllUsers,
          getUserById,
          updateUser,
          deleteUser
        };