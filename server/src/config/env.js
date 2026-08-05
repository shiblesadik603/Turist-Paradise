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
  // Optional — caching and the background job queue degrade gracefully (skip the cache,
  // run jobs inline) if Redis isn't reachable, so there's a sane local default.
  redisUrl: process.env.REDIS_URL || "redis://localhost:6379",
};
