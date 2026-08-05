/** Populates the shop product catalog. Safe to re-run — upserts by id instead of duplicating. */
const mongoose = require("mongoose");
const env = require("../config/env");
const { modelsByCategory } = require("../services/shopService");
const shopProducts = require("./shopProducts.data");

const run = async () => {
  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");

  let created = 0;
  let updated = 0;
  let total = 0;

  for (const [category, products] of Object.entries(shopProducts)) {
    const Model = modelsByCategory[category];
    for (const product of products) {
      total += 1;
      // stock is only set on first insert — re-running the seed must never reset stock that's
      // already been decremented by real orders
      const result = await Model.updateOne(
        { id: product.id },
        { $set: product, $setOnInsert: { stock: 50 } },
        { upsert: true }
      );
      if (result.upsertedCount > 0) {
        created += 1;
      } else if (result.modifiedCount > 0) {
        updated += 1;
      }
    }
  }

  console.log(`Seed complete: ${created} product(s) created, ${updated} updated, ${total} total.`);
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
