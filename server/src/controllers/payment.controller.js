const asyncHandler = require("../utils/asyncHandler");
const env = require("../config/env");
const paymentService = require("../services/paymentService");

const initPayment = asyncHandler(async (req, res) => {
  const url = await paymentService.initPayment(req.body);
  res.status(200).json({ success: true, message: "Payment initialized", data: { url } });
});

const success = (req, res) => res.redirect(`${env.frontendUrl}/payment-success`);
const fail = (req, res) => res.redirect(`${env.frontendUrl}/payment-failed`);
const cancel = (req, res) => res.redirect(`${env.frontendUrl}/cart`);

module.exports = { initPayment, success, fail, cancel };
