const express = require('express');
const {
  createSchedule,
  getAllSchedules,
  getSchedules,
  deleteSchedule,
} = require('../controllers/scheduleController');

const router = express.Router();

router.post('/', createSchedule);
router.get('/', getAllSchedules);
router.get('/:projectId', getSchedules);
router.delete('/:id', deleteSchedule);

module.exports = router;
