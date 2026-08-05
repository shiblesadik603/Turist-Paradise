const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/requireRole.middleware");
const {
  getSpots,
  getSpotBySlug,
  createSpot,
  updateSpot,
  deleteSpot,
} = require("../controllers/destinations.controller");

const router = express.Router();

router.get("/", requireAuth, getSpots);
router.post("/", requireAuth, requireRole("admin"), createSpot);
router.get("/:slug", requireAuth, getSpotBySlug);
router.put("/:slug", requireAuth, requireRole("admin"), updateSpot);
router.delete("/:slug", requireAuth, requireRole("admin"), deleteSpot);

module.exports = router;
