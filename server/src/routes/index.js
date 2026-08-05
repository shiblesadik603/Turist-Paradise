const express = require("express");

const authRoutes = require("./auth.routes");
const usersRoutes = require("./users.routes");
const destinationsRoutes = require("./destinations.routes");
const mapsRoutes = require("./maps.routes");
const plannerRoutes = require("./planner.routes");
const shopRoutes = require("./shop.routes");
const cartRoutes = require("./cart.routes");
const paymentRoutes = require("./payment.routes");
const blogsRoutes = require("./blogs.routes");
const ordersRoutes = require("./orders.routes");
const adminRoutes = require("./admin.routes");

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", usersRoutes);
router.use("/destinations", destinationsRoutes);
router.use("/maps", mapsRoutes);
router.use("/planner", plannerRoutes);
router.use("/shop", shopRoutes);
router.use("/cart", cartRoutes);
router.use("/payment", paymentRoutes);
router.use("/blogs", blogsRoutes);
router.use("/orders", ordersRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
