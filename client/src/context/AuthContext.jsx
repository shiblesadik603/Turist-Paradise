import { createContext, useMemo, useState } from "react";
import * as authApi from "../api/auth.api";
import {
  getToken,
  getRefreshToken,
  getUserId,
  setSession,
  clearSession,
} from "../utils/authStorage";
import { decodeToken } from "../utils/jwt";

export const AuthContext = createContext(null);

/** Holds the signed-in user's id/access-token (localStorage if "remembered", else sessionStorage) and the signup/login/logout actions. */
export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(getUserId());
  const [token, setToken] = useState(getToken());

  const persistSession = (user, accessToken, refreshToken, remember) => {
    setSession(accessToken, refreshToken, user._id, remember);
    setToken(accessToken);
    setUserId(user._id);
  };

  // Signup only creates the account — it doesn't start a session. The user logs in separately.
  const signup = async (name, email, password) => {
    await authApi.signup(name, email, password);
  };

  const login = async (email, password, rememberMe) => {
    const response = await authApi.login(email, password, rememberMe);
    const { user, accessToken, refreshToken } = response.data.data;
    persistSession(user, accessToken, refreshToken, rememberMe);
  };

  const loginWithGoogle = async (idToken, rememberMe) => {
    const response = await authApi.loginWithGoogle(idToken, rememberMe);
    const { user, accessToken, refreshToken } = response.data.data;
    persistSession(user, accessToken, refreshToken, rememberMe);
  };

  const logout = () => {
    // Best-effort server-side revocation — the client-side session clears regardless.
    const refreshToken = getRefreshToken();
    if (refreshToken) {
      authApi.logout(refreshToken).catch(() => {});
    }
    clearSession();
    setToken(null);
    setUserId(null);
  };

  const isAuthenticated = Boolean(token && userId);
  const role = useMemo(() => decodeToken(token)?.role ?? null, [token]);
  const isAdmin = role === "admin";

  return (
    <AuthContext.Provider
      value={{
        userId,
        token,
        role,
        isAdmin,
        isAuthenticated,
        signup,
        login,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
