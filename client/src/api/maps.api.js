import axiosClient from "./axiosClient";

export const getNearbyPlaces = (location, radius, type) =>
  axiosClient.get("/maps/places", { params: { location, radius, type } });
