/** CRUD endpoints for a user's saved AI trip plans, under /planner. */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const plannerService = require("../services/plannerService");

const createTripPlan = asyncHandler(async (req, res) => {
  if (!req.body.location || !req.body.userId) {
    throw new ApiError(400, "location and userId are required");
  }

  const savedPlan = await plannerService.createTripPlan(req.body);
  res.status(201).json({ success: true, message: "Trip plan saved", data: savedPlan });
});

const getTripPlans = asyncHandler(async (req, res) => {
  const plans = await plannerService.getTripPlansByUser(req.params.userId);
  res.status(200).json({ success: true, message: "Trip plans retrieved", data: plans });
});

const deleteTripPlan = asyncHandler(async (req, res) => {
  await plannerService.deleteTripPlan(req.params.id);
  res.status(200).json({ success: true, message: "Plan deleted successfully", data: null });
});

module.exports = { createTripPlan, getTripPlans, deleteTripPlan };
