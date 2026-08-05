/** GET /destinations, GET /destinations/:slug — the tourist spot catalog and single-spot detail. Also admin create/update/delete. */
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

const createSpot = asyncHandler(async (req, res) => {
  const spot = await destinationService.createSpot(req.body);
  res.status(201).json({ success: true, message: "Destination created", data: spot });
});

const updateSpot = asyncHandler(async (req, res) => {
  const spot = await destinationService.updateSpot(req.params.slug, req.body);
  res.status(200).json({ success: true, message: "Destination updated", data: spot });
});

const deleteSpot = asyncHandler(async (req, res) => {
  await destinationService.deleteSpot(req.params.slug);
  res.status(200).json({ success: true, message: "Destination deleted", data: null });
});

module.exports = { getSpots, getSpotBySlug, createSpot, updateSpot, deleteSpot };
