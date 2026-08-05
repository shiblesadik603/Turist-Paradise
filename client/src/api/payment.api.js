import axiosClient from "./axiosClient";

export const initPayment = (totalAmount, userId, cartItems) =>
  axiosClient.post("/payment/init", { totalAmount, userId, cartItems });
