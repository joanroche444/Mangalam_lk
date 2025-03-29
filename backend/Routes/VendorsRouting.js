const express = require('express');
const router = express.Router();
const {getVendors,addVendor,deleteVendor} = require('../controllers/vendorController');

// GET all vendors
router.get('/', getVendors);

// POST to add a new vendor
router.post('/add', addVendor);
router.delete('/remove/:id', deleteVendor); // Delete a vendor by ID


module.exports = router;
