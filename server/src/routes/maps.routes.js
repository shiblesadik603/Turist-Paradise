const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { getPlaces, getDistance } = require("../controllers/maps.controller");

const router = express.Router();

router.get("/places", requireAuth, getPlaces);
router.get("/distance", requireAuth, getDistance);

module.exports = router;
