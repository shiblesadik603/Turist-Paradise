/** GET /destinations, GET /destinations/:slug — the tourist spot catalog and single-spot detail. */
const asyncHandler = require("../utils/asyncHandler");
const destinationService = require("../services/destinationService");

const getSpots = asyncHandler(async (req, res) => {
  const spots = await destinationService.getAllSpots();
  res.status(200).json({ success: true, message: "Tourist spots retrieved", data: spots });
});

const getSpotBySlug = asyncHandler(async (req, res) => {
  const spot = await destinationService.getSpotBySlug(req.params.slug);
  res.status(200).json({ success: true, message: "Tourist spot retrieved", data: spot });
});

module.exports = { getSpots, getSpotBySlug };
