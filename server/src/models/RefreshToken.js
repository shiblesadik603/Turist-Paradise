const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: "User" },
  // A sha256 hash of the raw token — the raw value only ever exists client-side and in transit.
  tokenHash: { type: String, required: true, unique: true },
  // Carried forward on each rotation so a refreshed token keeps the original "remember me" lifetime.
  remember: { type: Boolean, required: true },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

// TTL index — Mongo automatically deletes documents once expiresAt has passed.
refreshTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema, "refreshtokens");

module.exports = RefreshToken;
