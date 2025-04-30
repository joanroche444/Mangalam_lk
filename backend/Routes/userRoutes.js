const express = require('express');

const router = express.Router();

const {loginUser, signupUser, getUserByID, deleteUser} = require('../controllers/userController');
//login route
router.post('/login', loginUser);

//signup route
router.post('/signup', signupUser);

//get user profile route
router.get('/:id', getUserByID);

//get all users route


//delete user route
router.delete('/:id', deleteUser);

module.exports = router;