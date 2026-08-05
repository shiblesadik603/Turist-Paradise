/** Decodes a JWT payload for display purposes only — every protected endpoint independently re-verifies the token server-side. */
export const decodeToken = (token) => {
  if (!token) return null;
  try {
    const payload = token.split(".")[1];
    const json = atob(payload.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(json);
  } catch {
    return null;
  }
};
