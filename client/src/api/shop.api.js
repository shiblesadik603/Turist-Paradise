import axiosClient from "./axiosClient";

export const getProductsByCategory = (category) => axiosClient.get(`/shop/${category}`);

/** Admin-only. */
export const createProduct = (category, data) => axiosClient.post(`/shop/${category}`, data);

export const updateProduct = (productId, data) => axiosClient.put(`/shop/${productId}`, data);

export const deleteProduct = (productId) => axiosClient.delete(`/shop/${productId}`);
