/** Populates the tourist spot catalog. Safe to re-run — upserts by name instead of duplicating. */
const mongoose = require("mongoose");
const env = require("../config/env");
const TouristSpotModel = require("../models/TouristSpot");
const touristSpots = require("./touristSpots.data");

const run = async () => {
  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");

  let created = 0;
  let updated = 0;

  for (const spot of touristSpots) {
    const result = await TouristSpotModel.updateOne(
      { name: spot.name },
      { $set: spot },
      { upsert: true }
    );
    if (result.upsertedCount > 0) {
      created += 1;
    } else if (result.modifiedCount > 0) {
      updated += 1;
    }
  }

  console.log(
    `Seed complete: ${created} spot(s) created, ${updated} updated, ${touristSpots.length} total.`
  );
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
