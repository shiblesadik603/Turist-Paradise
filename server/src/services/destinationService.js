/** Reads the tourist spot catalog. */
const TouristSpotModel = require("../models/TouristSpot");
const ApiError = require("../utils/ApiError");

const getAllSpots = () => TouristSpotModel.find();

const getSpotBySlug = async (slug) => {
  const spot = await TouristSpotModel.findOne({ slug });
  if (!spot) {
    throw new ApiError(404, "Tourist spot not found");
  }
  return spot;
};

module.exports = { getAllSpots, getSpotBySlug };
