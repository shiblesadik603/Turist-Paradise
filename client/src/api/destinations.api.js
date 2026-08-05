import axiosClient from "./axiosClient";

export const getSpots = () => axiosClient.get("/destinations");

export const getSpotBySlug = (slug) => axiosClient.get(`/destinations/${slug}`);

/** Admin-only. */
export const createDestination = (data) => axiosClient.post("/destinations", data);

export const updateDestination = (slug, data) => axiosClient.put(`/destinations/${slug}`, data);

export const deleteDestination = (slug) => axiosClient.delete(`/destinations/${slug}`);
