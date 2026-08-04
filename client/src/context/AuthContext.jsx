import { createContext, useState } from "react";
import * as authApi from "../api/auth.api";
import { getToken, getUserId, setSession, clearSession } from "../utils/authStorage";

export const AuthContext = createContext(null);

/** Holds the signed-in user's id/JWT (localStorage if "remembered", else sessionStorage) and the signup/login/logout actions. */
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(getUserId());
  const [token, setToken] = useState(getToken());

  const persistSession = (user, jwt, remember) => {
    setSession(jwt, user._id, remember);
    setToken(jwt);
    setUserId(user._id);
  };

  const signup = async (name, email, password) => {
    const response = await authApi.signup(name, email, password);
    const { user, token: jwt } = response.data.data;
    persistSession(user, jwt, false);
  };

  const login = async (email, password, rememberMe) => {
    const response = await authApi.login(email, password, rememberMe);
    const { user, token: jwt } = response.data.data;
    persistSession(user, jwt, rememberMe);
  };

  const logout = () => {
    clearSession();
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
