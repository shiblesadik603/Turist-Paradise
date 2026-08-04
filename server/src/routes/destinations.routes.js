const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { getSpots, getSpotBySlug } = require("../controllers/destinations.controller");

const router = express.Router();

router.get("/", requireAuth, getSpots);
router.get("/:slug", requireAuth, getSpotBySlug);

module.exports = router;
