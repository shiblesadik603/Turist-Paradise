const dotenv = require("dotenv");

dotenv.config();

const REQUIRED_VARS = ["PORT", "MONGO_URI", "FRONTEND_URL", "JWT_SECRET"];

const missing = REQUIRED_VARS.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(
    `Missing required environment variable(s): ${missing.join(", ")}. ` +
      "Check server/.env against server/.env.example."
  );
  process.exit(1);
}

module.exports = {
  port: process.env.PORT,
  mongoUri: process.env.MONGO_URI,
  frontendUrl: process.env.FRONTEND_URL,
  jwtSecret: process.env.JWT_SECRET,
  sslcommerzStoreId: process.env.SSLCOMMERZ_STORE_ID || "testbox",
  sslcommerzStorePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty",
  // Optional — Google sign-in is disabled (returns a clear error) until this is set.
  googleClientId: process.env.GOOGLE_CLIENT_ID || null,
  // Optional — caching degrades gracefully (skips itself) if Redis isn't reachable, so
  // there's a sane local default. The trip-plan job queue genuinely needs Redis, though —
  // that's the point of it being a queue.
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
  // Optional — trip generation returns a clear 503 until this is set.
  geminiApiKey: process.env.GEMINI_API_KEY || null,
  // Optional — avatar uploads return a clear error until all three are set. Needed because
  // most free hosts (e.g. Render's free tier) have an ephemeral filesystem: anything written
  // to local disk is wiped on every redeploy/restart, so profile pictures need to live
  // somewhere persistent instead.
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || null,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || null,
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || null,
};
