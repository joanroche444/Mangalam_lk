const mongoose = require('mongoose');

const VendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    service_type: { type: String, required: true },
    contact: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    hobbies: { type: [String], required: true }  // Array of strings
});

module.exports = mongoose.model('Vendor', VendorSchema);
