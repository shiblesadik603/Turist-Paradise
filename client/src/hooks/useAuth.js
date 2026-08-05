import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

/** Exposes { userId, token, isAuthenticated, signup, login, logout } from AuthContext. */
export const useAuth = () => useContext(AuthContext);
