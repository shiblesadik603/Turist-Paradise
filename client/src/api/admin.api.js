import axiosClient from "./axiosClient";

export const getStats = () => axiosClient.get("/admin/stats");
