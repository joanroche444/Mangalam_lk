const express = require('express');
const {
  createGuest,
  getGuests,
  deleteGuest,
} = require('../controllers/GuestController');

const router = express.Router();

router.post('/', createGuest);
router.get('/:projectId', getGuests);
router.delete('/:id', deleteGuest);

module.exports = router;