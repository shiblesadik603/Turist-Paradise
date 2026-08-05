import axiosClient from "./axiosClient";

export const getOrders = (userId) => axiosClient.get(`/orders/${userId}`);

/** Admin-only. */
export const getAllOrders = () => axiosClient.get("/orders");
