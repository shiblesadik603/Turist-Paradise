/** POST /payment/init (JWT-protected) plus the success/fail/cancel/ipn callbacks SSLCommerz posts to directly. */
const asyncHandler = require("../utils/asyncHandler");
const env = require("../config/env");
const paymentService = require("../services/paymentService");
const orderService = require("../services/orderService");

const initPayment = asyncHandler(async (req, res) => {
  const url = await paymentService.initPayment(req.body);
  res.status(200).json({ success: true, message: "Payment initialized", data: { url } });
});

const success = asyncHandler(async (req, res) => {
  const { tran_id: tranId, val_id: valId } = req.body;
  const result = await orderService.verifyAndSettle(tranId, valId);
  res.redirect(`${env.frontendUrl}/${result.ok ? "payment-success" : "payment-failed"}`);
});

const fail = asyncHandler(async (req, res) => {
  await orderService.markFailed(req.body.tran_id);
  res.redirect(`${env.frontendUrl}/payment-failed`);
});

const cancel = asyncHandler(async (req, res) => {
  await orderService.markCancelled(req.body.tran_id);
  res.redirect(`${env.frontendUrl}/cart`);
});

// SSLCommerz's real server-to-server webhook — the authoritative settlement path.
// The browser redirects above settle opportunistically too; verifyAndSettle is
// idempotent, so whichever of this and `success` arrives first does the work.
const ipn = asyncHandler(async (req, res) => {
  const { tran_id: tranId, val_id: valId } = req.body;
  await orderService.verifyAndSettle(tranId, valId);
  res.status(200).send("IPN received");
});

module.exports = { initPayment, success, fail, cancel, ipn };
