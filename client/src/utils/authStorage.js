const TOKEN_KEY = "authToken";
const USER_ID_KEY = "userId";

/**
 * Persists the session in localStorage (survives browser restarts) when `remember` is true,
 * otherwise in sessionStorage (cleared when the tab/browser closes).
 */
export const setSession = (token, userId, remember) => {
  const target = remember ? localStorage : sessionStorage;
  const other = remember ? sessionStorage : localStorage;

  other.removeItem(TOKEN_KEY);
  other.removeItem(USER_ID_KEY);
  target.setItem(TOKEN_KEY, token);
  target.setItem(USER_ID_KEY, userId);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

export const getUserId = () =>
  localStorage.getItem(USER_ID_KEY) || sessionStorage.getItem(USER_ID_KEY);

export const clearSession = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_ID_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_ID_KEY);
};
