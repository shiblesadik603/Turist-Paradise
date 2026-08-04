const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { getPlaces } = require("../controllers/maps.controller");

const router = express.Router();

router.get("/places", requireAuth, getPlaces);

module.exports = router;
