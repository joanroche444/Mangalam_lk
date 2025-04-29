const mongoose = require('mongoose');

const seatingSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  seatIndex: Number,
  guestName: String,
});

module.exports = mongoose.model('Seating', seatingSchema);
