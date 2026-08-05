import axios from "axios";
import { getToken, getRefreshToken, updateTokens, clearSession } from "../utils/authStorage";

/** Shared axios instance: backend base URL from env, auto-attaches the JWT to every request, silently refreshes on a 401. */
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
});

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Access tokens are short-lived (15 min) by design — a 401 mid-session is expected,
// not exceptional. Concurrent 401s share one in-flight refresh instead of each
// triggering their own (which would race and invalidate each other's rotation).
let refreshPromise = null;

const performRefresh = async () => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  // Plain axios, not axiosClient — going through axiosClient here would re-enter
  // this same response interceptor.
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/refresh`, {
    refreshToken,
  });
  const { accessToken, refreshToken: newRefreshToken } = response.data.data;
  updateTokens(accessToken, newRefreshToken);
  return accessToken;
};

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const isAuthEndpoint = originalRequest?.url?.includes("/auth/");

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retried &&
      !isAuthEndpoint
    ) {
      originalRequest._retried = true;
      try {
        refreshPromise ??= performRefresh().finally(() => {
          refreshPromise = null;
        });
        const newAccessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch {
        clearSession();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
