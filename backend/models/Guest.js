const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  name: String,
  category: { type: String, enum: ['Family', 'VIP', 'Friends', 'Other'] },
  contact: String,
  email: String,
});

module.exports = mongoose.model('Guest', guestSchema);