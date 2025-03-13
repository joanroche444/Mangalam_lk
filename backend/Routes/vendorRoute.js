const express = require('express');
const router = express.Router();
const Vendor = require('../models/vendor'); // Ensure correct capitalization

// Add a new vendor
router.post('/add', async (req, res) => {
    try {
        const { name, service_type, contact, email } = req.body;
        if (!name || !service_type || !contact || !email) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const newVendor = new Vendor({ name, service_type, contact, email });
        await newVendor.save();
        
        res.status(201).json({ message: 'Vendor added successfully', vendor: newVendor });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add vendor', details: error.message });
    }
});

module.exports = router;
