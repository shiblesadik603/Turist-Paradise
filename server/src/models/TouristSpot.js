const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
  },
  { _id: false }
);

const rideOptionSchema = new mongoose.Schema(
  {
    mode: String,
    description: String,
  },
  { _id: false }
);

const guideSchema = new mongoose.Schema(
  {
    name: String,
    vehicleType: String,
    phone: String,
    note: String,
  },
  { _id: false }
);

const guideInfoSchema = new mongoose.Schema(
  {
    needed: { type: Boolean, default: false },
    note: String,
    guides: [guideSchema],
  },
  { _id: false }
);

const touristSpotSchema = new mongoose.Schema({
  name: String,
  slug: { type: String, unique: true, sparse: true },
  description: String,
  imageUrl: String,
  latitude: Number,
  longitude: Number,
  highlights: [String],
  attractions: [attractionSchema],
  rideOptions: [rideOptionSchema],
  guideInfo: guideInfoSchema,
});

const TouristSpotModel = mongoose.model("TouristSpot", touristSpotSchema, "touristspot"); //explicitly declared

module.exports = TouristSpotModel;
