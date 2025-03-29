const mongoose = require('mongoose');

// Vendor Schema
const VendorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique:false },
  service_name: { type: String, required: true },
  service_type: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  what_we_provide: { type: String, required: true }
});

// Create the Vendor model
const Vendor = mongoose.model('Vendor', VendorSchema);

// Export the Vendor model
module.exports = Vendor;
