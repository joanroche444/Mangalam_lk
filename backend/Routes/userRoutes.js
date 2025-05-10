const express = require('express');

const router = express.Router();

const {loginUser, signupUser, getUserByID, deleteUser, updateUser, changeEmail} = require('../controllers/userController');
//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//get user profile route
router.get('/:id', getUserByID);

//get all users route


//delete user route
router.delete('/delete/:id', deleteUser);

//update user route
router.patch('/update/:id', updateUser)

router.post('/change-email/:id', changeEmail)

module.exports = router;