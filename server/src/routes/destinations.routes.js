const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { getSpots } = require("../controllers/destinations.controller");

const router = express.Router();

router.get("/", requireAuth, getSpots);

module.exports = router;
