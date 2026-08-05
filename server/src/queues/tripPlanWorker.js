/** Processes queued trip-generation jobs: calls Gemini, then saves the result as a TripPlan. */
const { Worker } = require("bullmq");
const { connection } = require("./tripPlanQueue");
const geminiService = require("../services/geminiService");
const plannerService = require("../services/plannerService");

const worker = new Worker(
  "trip-plan-generation",
  async (job) => {
    const { userId, location, totalDays, traveler, budget } = job.data;

    const generated = await geminiService.generateTripPlan({
      location,
      totalDays,
      traveler,
      budget,
    });

    const savedPlan = await plannerService.createTripPlan({
      userId,
      location,
      duration: `${totalDays} Days`,
      travelers: traveler,
      budget,
      hotels: generated.hotels,
      itinerary: generated.itinerary,
    });

    return savedPlan.toObject();
  },
  { connection }
);

worker.on("failed", (job, err) => {
  console.error(`Trip plan job ${job?.id} failed:`, err.message);
});

module.exports = worker;
