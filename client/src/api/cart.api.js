import axiosClient from "./axiosClient";

export const addToCart = (userId, product) =>
  axiosClient.post("/cart/add", { userId, product });

export const getCart = (userId) => axiosClient.get(`/cart/${userId}`);

export const updateCartItem = (userId, productId, quantity) =>
  axiosClient.put("/cart/update", { userId, productId, quantity });

export const removeFromCart = (userId, productId) =>
  axiosClient.delete("/cart/remove", { data: { userId, productId } });

export const clearCart = (userId) => axiosClient.delete(`/cart/clear/${userId}`);
