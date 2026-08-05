/** GET /maps/places — OpenStreetMap Overpass nearby-place proxy. */
const asyncHandler = require("../utils/asyncHandler");
const mapsService = require("../services/mapsService");

const getPlaces = asyncHandler(async (req, res) => {
  const { location, radius, type } = req.query;
  const data = await mapsService.getNearbyPlaces({ location, radius, type });
  res.status(200).json({ success: true, message: "Places retrieved", data });
});

module.exports = { getPlaces };
