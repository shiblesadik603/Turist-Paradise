import axiosClient from "./axiosClient";

export const getUser = (userId) => axiosClient.get(`/users/${userId}`);

export const updateUser = (userId, formData) =>
  axiosClient.put(`/users/${userId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

/** Admin-only. */
export const getAllUsers = () => axiosClient.get("/users");

export const updateUserRole = (userId, role) =>
  axiosClient.patch(`/users/${userId}/role`, { role });

export const deleteUser = (userId) => axiosClient.delete(`/users/${userId}`);
