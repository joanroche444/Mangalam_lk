const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: String,
  date: Date,
  venue: String,
  city: String,
  guests: Number,
  rooms: Number,
  theme: String,
  groomName: String,
  brideName: String,
  groomsmen: [String],
  bridesmaids: [String],
  otherCrew: [String],
  image: String,
});

module.exports = mongoose.model('Project', projectSchema);
