/** Read-only endpoint for a user's order history, under /orders. Orders are created/settled internally by the payment flow. */
const asyncHandler = require("../utils/asyncHandler");
const orderService = require("../services/orderService");

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrdersByUser(req.params.userId);
  res.status(200).json({ success: true, message: "Orders retrieved", data: orders });
});

module.exports = { getOrders };
