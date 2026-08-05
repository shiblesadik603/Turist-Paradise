/** Bootstraps the first admin account, since the API deliberately has no self-service way to grant admin. Usage: node src/seed/promoteAdmin.js user@example.com */
const mongoose = require("mongoose");
const env = require("../config/env");
const UserModel = require("../models/User");

const run = async () => {
  const email = process.argv[2];
  if (!email) {
    console.error("Usage: node src/seed/promoteAdmin.js <email>");
    process.exit(1);
  }

  await mongoose.connect(env.mongoUri);
  console.log("Connected to MongoDB");

  const result = await UserModel.updateOne({ email }, { $set: { role: "admin" } });
  if (result.matchedCount === 0) {
    console.error(`No user found with email ${email}`);
  } else {
    console.log(`${email} is now an admin.`);
  }

  await mongoose.disconnect();
};

run().catch((err) => {
  console.error("Failed:", err);
  process.exit(1);
});
