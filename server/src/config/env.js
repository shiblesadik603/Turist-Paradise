const dotenv = require("dotenv");

dotenv.config();

const REQUIRED_VARS = [
  "PORT",
  "MONGO_URI",
  "FRONTEND_URL",
  "JWT_SECRET",
  "GOOGLE_MAPS_API_KEY",
];

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
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY,
  sslcommerzStoreId: process.env.SSLCOMMERZ_STORE_ID || "testbox",
  sslcommerzStorePassword: process.env.SSLCOMMERZ_STORE_PASSWORD || "qwerty",
};
