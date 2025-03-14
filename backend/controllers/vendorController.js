const Vendor = require('../models/Vendors'); // Ensure the path is correct

// Get all vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find(); // Fetch all vendors
    res.status(200).json(vendors); // Return vendors as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendors', details: error.message });
  }
};

// Add a new vendor
const addVendor = async (req, res) => {
  const { email, service_type, price, quantity } = req.body;

  // Validate the required fields
  if (!email || !service_type || !price || !quantity) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newVendor = new Vendor({ email, service_type, price, quantity });

    // Save the new vendor to the database
    await newVendor.save();

    // Respond with success message
    res.status(201).json({ message: 'Vendor added successfully', vendor: newVendor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add vendor', details: error.message });
  }
};

// Export the controller functions
module.exports = {
  getVendors,
  addVendor,
};
