/** Order lifecycle: create a pending order at checkout, then settle it once SSLCommerz confirms payment. */
const SSLCommerzPayment = require("sslcommerz-lts");
const Order = require("../models/Order");
const env = require("../config/env");
const shopService = require("./shopService");
const cartService = require("./cartService");
const ApiError = require("../utils/ApiError");

const IS_LIVE = false; // matches paymentService — sandbox until the store goes live
const TAX_RATE = 0.08; // matches the tax rate the cart UI already charges

const toCents = (amount) => Math.round(Number(amount) * 100);

const createPendingOrder = async ({ tranId, userId, cartItems }) => {
  if (!tranId || !userId || !Array.isArray(cartItems) || cartItems.length === 0) {
    throw new ApiError(400, "tranId, userId, and a non-empty cartItems array are required");
  }

  const items = cartItems.map((item) => ({
    productId: item.productId,
    name: item.name,
    unitPriceCents: toCents(item.price),
    quantity: item.quantity,
  }));

  const subtotalCents = items.reduce((sum, item) => sum + item.unitPriceCents * item.quantity, 0);
  const taxCents = Math.round(subtotalCents * TAX_RATE);
  const totalCents = subtotalCents + taxCents;

  return Order.create({ tranId, userId, items, subtotalCents, taxCents, totalCents });
};

/** Decrements stock for a settled order's items. Skips (and logs) any item that's already sold out — a demo-project fallback, not a hard failure. */
const decrementStock = async (items) => {
  for (const item of items) {
    const found = await shopService.findProductById(item.productId);
    if (!found) {
      console.warn(
        `Order settlement: product ${item.productId} no longer exists, skipping stock update`
      );
      continue;
    }

    const result = await found.Model.updateOne(
      { id: item.productId, stock: { $gte: item.quantity } },
      { $inc: { stock: -item.quantity } }
    );

    if (result.modifiedCount === 0) {
      console.warn(
        `Order settlement: insufficient stock for ${item.productId}, order still marked paid`
      );
    } else {
      await shopService.invalidateCategoryCache(found.category);
    }
  }
};

/**
 * The single settlement path for both the success redirect and the IPN webhook.
 * Verifies the transaction against SSLCommerz's own API (their equivalent of a
 * signature check) before ever trusting it, then transitions pending -> paid
 * exactly once — a repeat call for an already-settled tranId is a safe no-op.
 */
const verifyAndSettle = async (tranId, valId) => {
  if (!tranId || !valId) {
    await markFailed(tranId);
    return { ok: false, reason: "Missing tran_id or val_id" };
  }

  const sslcz = new SSLCommerzPayment(env.sslcommerzStoreId, env.sslcommerzStorePassword, IS_LIVE);
  const validation = await sslcz.validate({ val_id: valId });

  if (!validation || !["VALID", "VALIDATED"].includes(validation.status)) {
    await markFailed(tranId);
    return { ok: false, reason: "SSLCommerz validation failed" };
  }

  const order = await Order.findOneAndUpdate(
    { tranId, status: "pending" },
    { $set: { status: "paid", valId, paidAt: new Date() } },
    { new: true }
  );

  if (!order) {
    // Already settled by a prior call (redirect + IPN both fired, or a retry) — no-op.
    return { ok: true, alreadySettled: true };
  }

  if (
    Number(validation.amount) &&
    Math.round(Number(validation.amount) * 100) !== order.totalCents
  ) {
    console.warn(
      `Order ${tranId}: SSLCommerz amount (${validation.amount}) doesn't match order total (${order.totalCents / 100})`
    );
  }

  await decrementStock(order.items);
  await cartService.clearCart(order.userId);

  return { ok: true, order };
};

const markFailed = (tranId) =>
  Order.findOneAndUpdate({ tranId, status: "pending" }, { $set: { status: "failed" } });

const markCancelled = (tranId) =>
  Order.findOneAndUpdate({ tranId, status: "pending" }, { $set: { status: "cancelled" } });

const getOrdersByUser = (userId) => Order.find({ userId }).sort("-createdAt");

/** Admin-only: every order across every user. */
const getAllOrders = () => Order.find({}).sort("-createdAt");

module.exports = {
  createPendingOrder,
  verifyAndSettle,
  markFailed,
  markCancelled,
  getOrdersByUser,
  getAllOrders,
};
