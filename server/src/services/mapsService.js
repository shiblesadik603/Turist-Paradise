const axios = require("axios");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const getNearbyPlaces = async ({ location, radius, type }) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location}&radius=${radius}&type=${type}&key=${env.googleMapsApiKey}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw new ApiError(500, "Failed to fetch data from Places API");
  }
};

const getDistance = async ({ originLat, originLng, destLat, destLng }) => {
  if (!originLat || !originLng || !destLat || !destLng) {
    throw new ApiError(400, "Missing or invalid parameters");
  }

  const origin = `${originLat},${originLng}`;
  const destination = `${destLat},${destLng}`;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&key=${env.googleMapsApiKey}`;

  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    throw new ApiError(500, "Failed to fetch distance from Google API");
  }

  if (response.data.status !== "OK") {
    throw new ApiError(500, "Failed to fetch distance from Google API");
  }

  const distance = response.data.rows[0].elements[0].distance.text;
  const duration = response.data.rows[0].elements[0].duration.text;
  return { distance, duration };
};

module.exports = { getNearbyPlaces, getDistance };
