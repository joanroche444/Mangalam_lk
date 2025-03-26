const express = require('express');
const router = express.Router();
const {getVendors,addVendor} = require('../controllers/vendorController');

// GET all vendors
router.get('/', getVendors);

// POST to add a new vendor
router.post('/add', addVendor);



module.exports = router;
