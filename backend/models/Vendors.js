const mongoose = require('mongoose');

// Vendor Schema
const VendorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  service_type: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

// Export the model (mongoose automatically uses the plural form 'vendors' for the collection)
module.exports = mongoose.model('Vendor', VendorSchema);
