/** Reads the tourist spot catalog. */
const TouristSpotModel = require("../models/TouristSpot");

const getAllSpots = () => TouristSpotModel.find();

module.exports = { getAllSpots };
