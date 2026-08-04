const express = require("express");
const { signup, login } = require("../controllers/auth.controller");
const { authRateLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);

module.exports = router;
