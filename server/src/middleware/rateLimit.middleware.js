const rateLimit = require("express-rate-limit");

const makeLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message, data: null },
  });

/** Throttles auth endpoints to 10 requests per 15 minutes per IP, to slow down brute-force attempts. */
const authRateLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many attempts. Please try again in a few minutes.",
});

/** Throttles saving trip plans, to slow down scripted spam writes. */
const plannerRateLimiter = makeLimiter({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: "Too many trip plans saved. Please try again in an hour.",
});

/** Throttles payment initialization to slow down scripted checkout abuse. */
const paymentRateLimiter = makeLimiter({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Too many payment attempts. Please try again in a few minutes.",
});

module.exports = { authRateLimiter, plannerRateLimiter, paymentRateLimiter };
