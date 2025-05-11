const Seating = require('../models/Seating');

const assignSeat = async (req, res) => {
  try {
    const seat = new Seating(req.body);
    await seat.save();
    res.status(201).json(seat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getSeating = async (req, res) => {
  const { projectId } = req.params;
  const seats = await Seating.find({ projectId });
  res.json(seats);
};

const resetSeating = async (req, res) => {
  const { projectId } = req.params;
  await Seating.deleteMany({ projectId });
  res.json({ message: 'Seating reset' });
};

module.exports = {
  assignSeat,
  getSeating,
  resetSeating,
};
