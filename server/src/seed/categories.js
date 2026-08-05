/** Populates the shop category tree. Safe to re-run — upserts by name instead of duplicating. Parents must appear before their children in categories.data.js. */
const mongoose = require("mongoose");
const env = require("../config/env");
const Category = require("../models/Category");
const categories = require("./categories.data");

const run = async () => {
  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");

  let created = 0;
  let updated = 0;

  for (const { name, parent } of categories) {
    let parentId = null;
    if (parent) {
      const parentDoc = await Category.findOne({ name: parent });
      if (!parentDoc) {
        throw new Error(
          `Parent category "${parent}" not found — check ordering in categories.data.js`
        );
      }
      parentId = parentDoc._id;
    }

    const result = await Category.updateOne({ name }, { $set: { parentId } }, { upsert: true });
    if (result.upsertedCount > 0) {
      created += 1;
    } else if (result.modifiedCount > 0) {
      updated += 1;
    }
  }

  console.log(
    `Seed complete: ${created} categor${created === 1 ? "y" : "ies"} created, ${updated} updated.`
  );
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
