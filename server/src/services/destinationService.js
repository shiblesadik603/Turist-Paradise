/** Reads the tourist spot catalog. */
const TouristSpotModel = require("../models/TouristSpot");
const ApiError = require("../utils/ApiError");
const cacheService = require("./cacheService");

const SPOTS_CACHE_KEY = "destinations:all";
const CACHE_TTL_SECONDS = 300; // 5 min — rarely-changing catalog data

const getAllSpots = async () => {
  const cached = await cacheService.get(SPOTS_CACHE_KEY);
  if (cached) return cached;

  const spots = await TouristSpotModel.find();
  await cacheService.set(SPOTS_CACHE_KEY, spots, CACHE_TTL_SECONDS);
  return spots;
};

const getSpotBySlug = async (slug) => {
  const spot = await TouristSpotModel.findOne({ slug });
  if (!spot) {
    throw new ApiError(404, "Tourist spot not found");
  }
  return spot;
};

module.exports = { getAllSpots, getSpotBySlug };
