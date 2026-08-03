const SSLCommerzPayment = require("sslcommerz-lts");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const IS_LIVE = false; // true for live, false for sandbox
const backendUrl = `http://localhost:${env.port}`;

const initPayment = async ({ totalAmount, userId, cartItems }) => {
  const transactionId = `T_${Date.now()}`;

  const data = {
    total_amount: totalAmount,
    currency: "BDT",
    tran_id: transactionId,
    success_url: `${backendUrl}/api/v1/payment/success`,
    fail_url: `${backendUrl}/api/v1/payment/fail`,
    cancel_url: `${backendUrl}/api/v1/payment/cancel`,
    ipn_url: `${backendUrl}/api/v1/payment/ipn`,
    shipping_method: "NO",
    product_name: "Travel Gear Items",
    product_category: "Physical goods",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
  };

  const sslcz = new SSLCommerzPayment(env.sslcommerzStoreId, env.sslcommerzStorePassword, IS_LIVE);
  const apiResponse = await sslcz.init(data);

  if (!apiResponse?.GatewayPageURL) {
    throw new ApiError(500, "Failed to get payment URL");
  }

  return apiResponse.GatewayPageURL;
};

module.exports = { initPayment };
