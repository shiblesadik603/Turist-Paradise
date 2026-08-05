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

/** Admin-only: the core fields editable from the admin panel — the richer detail-page fields (attractions, rideOptions, guideInfo) stay seed-data-only for now. */
const EDITABLE_FIELDS = [
  "name",
  "slug",
  "description",
  "imageUrl",
  "latitude",
  "longitude",
  "highlights",
];

const pickEditableFields = (data) =>
  EDITABLE_FIELDS.reduce((fields, key) => {
    if (data[key] !== undefined) fields[key] = data[key];
    return fields;
  }, {});

const createSpot = async (data) => {
  const fields = pickEditableFields(data);
  if (!fields.name || !fields.slug) {
    throw new ApiError(400, "name and slug are required");
  }

  try {
    const spot = await TouristSpotModel.create(fields);
    await cacheService.del(SPOTS_CACHE_KEY);
    return spot;
  } catch (err) {
    if (err.code === 11000) {
      throw new ApiError(400, `A destination with slug "${fields.slug}" already exists`);
    }
    throw err;
  }
};

const updateSpot = async (slug, data) => {
  const spot = await TouristSpotModel.findOneAndUpdate({ slug }, pickEditableFields(data), {
    new: true,
    runValidators: true,
  });
  if (!spot) {
    throw new ApiError(404, "Tourist spot not found");
  }
  await cacheService.del(SPOTS_CACHE_KEY);
  return spot;
};

const deleteSpot = async (slug) => {
  const spot = await TouristSpotModel.findOneAndDelete({ slug });
  if (!spot) {
    throw new ApiError(404, "Tourist spot not found");
  }
  await cacheService.del(SPOTS_CACHE_KEY);
};

module.exports = { getAllSpots, getSpotBySlug, createSpot, updateSpot, deleteSpot };
