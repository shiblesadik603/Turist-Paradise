const TravelPlan = require("../models/TripPlanModel");

const createTripPlan = (planData) => new TravelPlan(planData).save();

const getTripPlansByUser = (userId) => TravelPlan.find({ userId });

const deleteTripPlan = (id) => TravelPlan.findByIdAndDelete(id);

module.exports = { createTripPlan, getTripPlansByUser, deleteTripPlan };
