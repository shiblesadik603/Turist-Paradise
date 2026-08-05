const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { plannerRateLimiter } = require("../middleware/rateLimit.middleware");
const {
  createTripPlan,
  getTripPlans,
  deleteTripPlan,
  generateTripPlan,
  getJobStatus,
} = require("../controllers/planner.controller");

const router = express.Router();

router.post("/", requireAuth, plannerRateLimiter, createTripPlan);
router.post("/generate", requireAuth, plannerRateLimiter, generateTripPlan);
router.get("/jobs/:jobId", requireAuth, getJobStatus);
router.get("/:userId", requireAuth, getTripPlans);
router.delete("/:id", requireAuth, deleteTripPlan);

module.exports = router;
