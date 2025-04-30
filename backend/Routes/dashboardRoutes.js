const express = require("express");

//const {protect} = require ("../middleware/autMiddleware");
const {getDashboardData} = require ("../controllers/dashboardController");

const router = express.Router ();

router.get("/dashboard",getDashboardData);

module.exports = router; 