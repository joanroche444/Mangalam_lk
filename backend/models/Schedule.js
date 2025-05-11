const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  time: String,
  event: String,
  duration: String,
});

module.exports = mongoose.model('Schedule', scheduleSchema);
