/** Populates demo travel blog posts. Safe to re-run — upserts by title instead of duplicating. */
const mongoose = require("mongoose");
const env = require("../config/env");
const BlogModel = require("../models/Blog");
const blogs = require("./blogs.data");

const run = async () => {
  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");

  let created = 0;
  let updated = 0;

  for (const blog of blogs) {
    const { reactionCount, comments, ...rest } = blog;

    // Comments/reactions are only seeded on first insert — re-running must never overwrite
    // real engagement a logged-in user has since added to these demo posts.
    const result = await BlogModel.updateOne(
      { title: blog.title },
      {
        $set: { ...rest, authorId: null },
        $setOnInsert: {
          comments,
          reactions: Array.from({ length: reactionCount }, (_, i) => `demo-reaction-${i + 1}`),
        },
      },
      { upsert: true }
    );
    if (result.upsertedCount > 0) {
      created += 1;
    } else if (result.modifiedCount > 0) {
      updated += 1;
    }
  }

  console.log(
    `Seed complete: ${created} blog(s) created, ${updated} updated, ${blogs.length} total.`
  );
  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
