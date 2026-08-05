const express = require("express");
const { signup, login, googleLogin, refresh, logout } = require("../controllers/auth.controller");
const { authRateLimiter } = require("../middleware/rateLimit.middleware");

const router = express.Router();

router.post("/signup", authRateLimiter, signup);
router.post("/login", authRateLimiter, login);
router.post("/google", authRateLimiter, googleLogin);
router.post("/refresh", authRateLimiter, refresh);
router.post("/logout", logout);

module.exports = router;
