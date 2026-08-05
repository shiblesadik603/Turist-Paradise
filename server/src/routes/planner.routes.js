const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { plannerRateLimiter } = require("../middleware/rateLimit.middleware");
const {
  createTripPlan,
  getTripPlans,
  deleteTripPlan,
} = require("../controllers/planner.controller");

const router = express.Router();

router.post("/", requireAuth, plannerRateLimiter, createTripPlan);
router.get("/:userId", requireAuth, getTripPlans);
router.delete("/:id", requireAuth, deleteTripPlan);

module.exports = router;
