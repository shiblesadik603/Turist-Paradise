const ACCESS_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_ID_KEY = "userId";

/**
 * Persists the session in localStorage (survives browser restarts) when `remember` is true,
 * otherwise in sessionStorage (cleared when the tab/browser closes).
 */
export const setSession = (accessToken, refreshToken, userId, remember) => {
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;

  other.removeItem(ACCESS_TOKEN_KEY);
  other.removeItem(REFRESH_TOKEN_KEY);
  other.removeItem(USER_ID_KEY);
  target.setItem(ACCESS_TOKEN_KEY, accessToken);
  target.setItem(REFRESH_TOKEN_KEY, refreshToken);
  target.setItem(USER_ID_KEY, userId);
};

export const getToken = () =>
  localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY);

export const getRefreshToken = () =>
  localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);

export const getUserId = () =>
  localStorage.getItem(USER_ID_KEY) || sessionStorage.getItem(USER_ID_KEY);

/** Called after a silent refresh — writes the rotated pair back into whichever storage already holds the session. */
export const updateTokens = (accessToken, refreshToken) => {
  const target = localStorage.getItem(USER_ID_KEY) ? localStorage : sessionStorage;
  target.setItem(ACCESS_TOKEN_KEY, accessToken);
  target.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const clearSession = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(USER_ID_KEY);
};
