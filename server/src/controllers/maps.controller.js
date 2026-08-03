const asyncHandler = require("../utils/asyncHandler");
const mapsService = require("../services/mapsService");

const getPlaces = asyncHandler(async (req, res) => {
  const { location, radius, type } = req.query;
  const data = await mapsService.getNearbyPlaces({ location, radius, type });
  res.status(200).json({ success: true, message: "Places retrieved", data });
});

const getDistance = asyncHandler(async (req, res) => {
  const { originLat, originLng, destLat, destLng } = req.query;
  const data = await mapsService.getDistance({ originLat, originLng, destLat, destLng });
  res.status(200).json({ success: true, message: "Distance retrieved", data });
});

module.exports = { getPlaces, getDistance };
