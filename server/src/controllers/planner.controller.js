/** CRUD endpoints for a user's saved AI trip plans, plus the queued-generation endpoints, under /planner. */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const plannerService = require("../services/plannerService");
const { tripPlanQueue } = require("../queues/tripPlanQueue");

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

const generateTripPlan = asyncHandler(async (req, res) => {
  const { location, totalDays, traveler, budget } = req.body;
  if (!location || !totalDays || !traveler || !budget) {
    throw new ApiError(400, "location, totalDays, traveler, and budget are required");
  }

  const job = await tripPlanQueue.add("generate", {
    location,
    totalDays,
    traveler,
    budget,
    userId: req.userId,
  });

  res
    .status(202)
    .json({ success: true, message: "Trip generation queued", data: { jobId: job.id } });
});

const JOB_STATE_TO_STATUS = {
  completed: "completed",
  failed: "failed",
  active: "processing",
  waiting: "queued",
  delayed: "queued",
  "waiting-children": "queued",
};

const getJobStatus = asyncHandler(async (req, res) => {
  const job = await tripPlanQueue.getJob(req.params.jobId);
  if (!job) {
    throw new ApiError(404, "Job not found");
  }

  const rawState = await job.getState();
  const status = JOB_STATE_TO_STATUS[rawState] || "queued";

  res.status(200).json({
    success: true,
    message: "Job status retrieved",
    data: {
      status,
      result: status === "completed" ? job.returnvalue : null,
      error: status === "failed" ? job.failedReason : null,
    },
  });
});

module.exports = {
  createTripPlan,
  getTripPlans,
  deleteTripPlan,
  generateTripPlan,
  getJobStatus,
};
