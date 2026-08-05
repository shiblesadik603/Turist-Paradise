/** CRUD for a user's AI-generated trip plans. */
const TripPlan = require("../models/TripPlan");

const createTripPlan = (planData) => new TripPlan(planData).save();

const getTripPlansByUser = (userId) => TripPlan.find({ userId });

const deleteTripPlan = (id) => TripPlan.findByIdAndDelete(id);

module.exports = { createTripPlan, getTripPlansByUser, deleteTripPlan };
