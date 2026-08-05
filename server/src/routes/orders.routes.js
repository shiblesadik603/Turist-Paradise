const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const requireRole = require("../middleware/requireRole.middleware");
const { getOrders, getAllOrders } = require("../controllers/orders.controller");

const router = express.Router();

router.get("/", requireAuth, requireRole("admin"), getAllOrders);
router.get("/:userId", requireAuth, getOrders);

module.exports = router;
