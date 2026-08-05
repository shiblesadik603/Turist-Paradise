import axiosClient from "./axiosClient";

export const createTripPlan = (travelPlanData) => axiosClient.post("/planner", travelPlanData);

/** Queues server-side AI trip generation as a background job; returns { jobId } immediately. */
export const generateTripPlan = (formData) => axiosClient.post("/planner/generate", formData);

export const getJobStatus = (jobId) => axiosClient.get(`/planner/jobs/${jobId}`);

export const getTripPlans = (userId) => axiosClient.get(`/planner/${userId}`);

export const deleteTripPlan = (planId) => axiosClient.delete(`/planner/${planId}`);
