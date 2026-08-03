import axiosClient from "./axiosClient";

export const getProductsByCategory = (category) => axiosClient.get(`/shop/${category}`);
