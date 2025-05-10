const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}


//update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // Update the user document
        const updatedUser = await User.findByIdAndUpdate(id, updates, {
            new: true,              // return the modified document
            runValidators: true     // ensure updates match schema
        }).select('-password');     // exclude password from response

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        console.error("Update User Error:", error.message);
        res.status(500).json({ error: 'Server error while updating user' });
    }
};

//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password)

        const token = createToken(user._id);

        res.status(200).json({ 
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            _id: user._id, 
            token 
        });
    }catch (error) {
        res.status(400).json({ error: error.message });  
    }
    
  
}

//signup user
const signupUser = async (req, res) => {
    try {
        let { firstName, lastName, email, password, phone, role } = req.body;

      
        if (!firstName || !lastName || !email || !password ) {
            return res.status(400).json({ error: 'Required fields: firstName, lastName, email, password' });
        }


        phone = phone || "";
        role = role || "couple";

        // Create the user
        const user = await User.signup({ firstName, lastName, email, password, phone, role });

        // Generate token
        const token = createToken(user._id);

        // Send success response
        res.status(201).json({
            message: "User successfully registered!",
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        console.error("Signup Error:", error.message); // Log error for debugging
        res.status(400).json({ error: error.message });
    }
};

const getUserByID = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const user = await User.findById(id).select('-password'); 

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            user: {
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                role: user.role,
                weddingDate: user.weddingDate,
                location: user.location,
            
            }
        });
    } catch (error) {
        console.error("Get User Error:", error.message);
        res.status(500).json({ error: 'Server error while fetching user' });
    }
};

const deleteUser = async (req, res) => {
    try {
      const userId = req.params.id;

      if (req.user && req.user._id !== userId) {
        return res.status(403).json({ message: 'Not authorized to delete this account' });
      }
      
      
      // Delete the user
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Success response
      res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error);
      res.status(500).json({ message: 'Server error while deleting account' });
    }
  };

  const changeEmail = async (req, res) => {
    try {
      const { id } = req.params;
      const { newEmail, password } = req.body;
      
      // Validate inputs
      if (!newEmail || !password) {
        return res.status(400).json({ error: 'All fields are required' });
      }
      
      // Find the user
      const user = await User.findById(id);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Verify password
      const isPasswordValid = await user.verifyPassword(password);
      
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Incorrect password' });
      }
      
      // Check if email is already in use by another user
      const emailExists = await User.findOne({ email: newEmail });
      
      if (emailExists && emailExists._id.toString() !== id) {
        return res.status(400).json({ error: 'Email is already in use by another account' });
      }
      
      // Update email
      user.email = newEmail;
      await user.save();
      
      res.status(200).json({
        message: 'Email updated successfully',
        user: {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Change Email Error:', error.message);
      res.status(500).json({ error: 'Server error while updating email' });
    }
  };
  

module.exports = {updateUser, loginUser, signupUser, getUserByID, deleteUser, changeEmail };