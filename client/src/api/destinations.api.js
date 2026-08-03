import axiosClient from "./axiosClient";

export const getSpots = () => axiosClient.get("/destinations");
