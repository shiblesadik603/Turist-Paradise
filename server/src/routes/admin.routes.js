const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/requireRole.middleware");
const { getStats } = require("../controllers/admin.controller");

const router = express.Router();

// Every route under /admin requires an admin — applied once here rather than per-route.
router.use(requireAuth, requireRole("admin"));

router.get("/stats", getStats);

module.exports = router;
