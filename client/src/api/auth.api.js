import axiosClient from "./axiosClient";

export const signup = (name, email, password) =>
  axiosClient.post("/auth/signup", { name, email, password });

export const login = (email, password) =>
  axiosClient.post("/auth/login", { email, password });
