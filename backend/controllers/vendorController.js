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
  const { email, service_name, service_type, description, price, what_we_provide } = req.body;


  // Validate the required fields
  if (!email || !service_name || !service_type || !description || !price || !what_we_provide) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const newVendor = new Vendor({ email, service_name, service_type, description, price, what_we_provide });
    await newVendor.save();

    // Respond with success message
    res.status(201).json({ message: 'Vendor added successfully', vendor: newVendor });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add vendor', details: error.message });
  }
};

const updateVendor = async (req, res) => {
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // Ensures the returned document is the updated one
    );

    if (!updatedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({
      message: 'Vendor updated successfully',
      vendor: updatedVendor
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Export the controller functions
module.exports = {
  getVendors,
  addVendor,
  updateVendor
};
