import axiosClient from "./axiosClient";

export const getOrders = (userId) => axiosClient.get(`/orders/${userId}`);
