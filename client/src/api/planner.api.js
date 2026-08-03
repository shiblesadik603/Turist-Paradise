import axiosClient from "./axiosClient";

export const createTripPlan = (travelPlanData) => axiosClient.post("/planner", travelPlanData);

export const getTripPlans = (userId) => axiosClient.get(`/planner/${userId}`);

export const deleteTripPlan = (planId) => axiosClient.delete(`/planner/${planId}`);
