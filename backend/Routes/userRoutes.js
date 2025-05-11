const express = require('express');

const router = express.Router();

const { protect, isAddmin, isVendor, isCouple } = require('../middleware/authMiddleware');

const {loginUser, signupUser, getUserByID, deleteUser, updateUser, changeEmail} = require('../controllers/userController');
//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//get user profile route
router.get('/:id', protect, getUserByID);

//get all users route


//delete user route
router.delete('/delete/:id', protect, deleteUser);

//update user route
router.patch('/update/:id', protect, updateUser)

router.post('/change-email/:id', protect, changeEmail)

module.exports = router;