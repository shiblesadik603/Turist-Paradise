import axiosClient from "./axiosClient";

export const getNearbyPlaces = (location, radius, type) =>
  axiosClient.get("/maps/places", { params: { location, radius, type } });

export const getDistance = (originLat, originLng, destLat, destLng) =>
  axiosClient.get("/maps/distance", {
    params: { originLat, originLng, destLat, destLng },
  });
