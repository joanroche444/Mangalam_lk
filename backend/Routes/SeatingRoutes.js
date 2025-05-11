const express = require('express');
const {
  assignSeat,
  getSeating,
  resetSeating,
} = require('../controllers/seatingController');

const router = express.Router();

router.post('/', assignSeat);
router.get('/:projectId', getSeating);
router.delete('/reset/:projectId', resetSeating);

module.exports = router;
 