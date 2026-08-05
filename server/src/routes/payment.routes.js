const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { paymentRateLimiter } = require("../middleware/rateLimit.middleware");
const { initPayment, success, fail, cancel, ipn } = require("../controllers/payment.controller");

const router = express.Router();

// SSLCommerz posts directly to success/fail/cancel/ipn without an auth header
router.post("/init", requireAuth, paymentRateLimiter, initPayment);
router.post("/success", success);
router.post("/fail", fail);
router.post("/cancel", cancel);
router.post("/ipn", ipn);

module.exports = router;
