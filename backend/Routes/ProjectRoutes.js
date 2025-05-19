const express = require('express');
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
  getUserProjects
} = require('../controllers/projectController');

// Middleware to protect routes
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', getProjects);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

router.get('/user-projects', protect, getUserProjects);

module.exports = router;
