import axiosClient from "./axiosClient";

export const getSpots = () => axiosClient.get("/destinations");

export const getSpotBySlug = (slug) => axiosClient.get(`/destinations/${slug}`);
