const rateLimit = require("express-rate-limit");

/** Throttles auth endpoints to 10 requests per 15 minutes per IP, to slow down brute-force attempts. */
const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many attempts. Please try again in a few minutes.",
    data: null,
  },
});

module.exports = { authRateLimiter };
