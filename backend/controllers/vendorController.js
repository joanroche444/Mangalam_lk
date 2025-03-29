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
  try {
    const { service_name, service_type, description, what_we_provide, price, email } = req.body;

    // Check if the service name already exists
    const existingVendor = await Vendor.findOne({ service_name });

    if (existingVendor) {
      return res.status(400).json({ message: 'Service name already exists. Please choose another.' });
    }

    // Create a new vendor if service name does not exist
    const newVendor = new Vendor({
      service_name,
      service_type,
      description,
      what_we_provide,
      price,
      email,
    });

    await newVendor.save();
    return res.status(201).json(newVendor);
  } catch (error) {
    console.error("Error adding vendor:", error);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// Delete a vendor
const deleteVendor = async (req, res) => {
  try {
    const deletedVendor = await Vendor.findByIdAndDelete(req.params.id);

    if (!deletedVendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.status(200).json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vendor', details: error.message });
  }
};

// Export the controller functions

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

const getVendorByEmail = async (req, res) => {
  try {
    const { email } = req.params; // Get the email from the URL parameters
    const vendor = await Vendor.findOne({ email }); // Find the vendor by email

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' }); // Return 404 if vendor is not found
    }

    res.status(200).json(vendor); // Return the found vendor as JSON response
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch vendor', details: error.message }); // Handle errors
  }
};



// Export the controller functions
module.exports = {
  getVendors,
  addVendor,
  getVendorByEmail,
  deleteVendor,
  updateVendor
};
