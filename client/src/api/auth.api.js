import axiosClient from "./axiosClient";

export const signup = (name, email, password) =>
  axiosClient.post("/auth/signup", { name, email, password });

export const login = (email, password, rememberMe) =>
  axiosClient.post("/auth/login", { email, password, rememberMe });

export const loginWithGoogle = (idToken, rememberMe) =>
  axiosClient.post("/auth/google", { idToken, rememberMe });

export const logout = (refreshToken) => axiosClient.post("/auth/logout", { refreshToken });
