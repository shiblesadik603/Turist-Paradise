const asyncHandler = require("../utils/asyncHandler");
const destinationService = require("../services/destinationService");

const getSpots = asyncHandler(async (req, res) => {
  const spots = await destinationService.getAllSpots();
  res.status(200).json({ success: true, message: "Tourist spots retrieved", data: spots });
});

module.exports = { getSpots };
