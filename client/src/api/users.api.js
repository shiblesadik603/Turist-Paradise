import axiosClient from "./axiosClient";

export const getUser = (userId) => axiosClient.get(`/users/${userId}`);

export const updateUser = (userId, formData) =>
  axiosClient.put(`/users/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
