const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { initPayment, success, fail, cancel } = require("../controllers/payment.controller");

const router = express.Router();

// SSLCommerz posts directly to success/fail/cancel without an auth header
router.post("/init", requireAuth, initPayment);
router.post("/success", success);
router.post("/fail", fail);
router.post("/cancel", cancel);

module.exports = router;
