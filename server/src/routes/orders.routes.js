const express = require("express");
const requireAuth = require("../middleware/auth.middleware");
const { getOrders } = require("../controllers/orders.controller");

const router = express.Router();

router.get("/:userId", requireAuth, getOrders);

module.exports = router;
