import { createContext, useState } from "react";
import * as authApi from "../api/auth.api";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const persistSession = (user, jwt) => {
    localStorage.setItem("authToken", jwt);
    localStorage.setItem("userId", user._id);
    setToken(jwt);
    setUserId(user._id);
  };

  const signup = async (name, email, password) => {
    const response = await authApi.signup(name, email, password);
    const { user, token: jwt } = response.data.data;
    persistSession(user, jwt);
  };

  const login = async (email, password) => {
    const response = await authApi.login(email, password);
    const { user, token: jwt } = response.data.data;
    persistSession(user, jwt);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userId");
    setToken(null);
    setUserId(null);
  };

  const isAuthenticated = Boolean(token && userId);

  return (
    <AuthContext.Provider value={{ userId, token, isAuthenticated, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
