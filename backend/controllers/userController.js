const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const createToken = (_id) => {
   return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d'})
}


//login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.login(email, password)

        const token = createToken(user._id);

        res.status(200).json({ email, token });
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
        const { id } = req.params;
        const { password } = req.body; 

        if (!id) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        if (!password) {
            return res.status(400).json({ error: 'Password is required for account deletion' });
        }

        // First verify the user's password
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Verify password (you'll need to add this method to your User model)
        const isMatch = await user.verifyPassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Delete the user
        await User.findByIdAndDelete(id);

        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error("Delete User Error:", error.message);
        res.status(500).json({ error: 'Server error while deleting user' });
    }
};

module.exports = { loginUser, signupUser, getUserByID, deleteUser };