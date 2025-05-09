const Guest = require('../models/Guest');

const createGuest = async (req, res) => {
  try {
    const guest = new Guest(req.body);
    await guest.save();
    res.status(201).json(guest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getGuests = async (req, res) => {
  const { projectId } = req.params;
  const guests = await Guest.find({ projectId });
  res.json(guests);
};

const deleteGuest = async (req, res) => {
  await Guest.findByIdAndDelete(req.params.id);
  res.json({ message: 'Guest deleted' });
};

module.exports = {
  createGuest,
  getGuests,
  deleteGuest,
};
