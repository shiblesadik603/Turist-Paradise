/** Signup/login/refresh/logout: hashes/verifies passwords with bcrypt, issues short-lived access JWTs backed by rotating opaque refresh tokens. Also handles Google sign-in. */
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const UserModel = require("../models/User");
const RefreshToken = require("../models/RefreshToken");
const ApiError = require("../utils/ApiError");
const env = require("../config/env");

const googleClient = env.googleClientId ? new OAuth2Client(env.googleClientId) : null;

const SALT_ROUNDS = 10;
const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_TTL = {
  default: 24 * 60 * 60 * 1000, // 1 day
  remember: 30 * 24 * 60 * 60 * 1000, // 30 days
};

const signAccessToken = (userId, role) =>
  jwt.sign({ userId, role }, env.jwtSecret, { expiresIn: ACCESS_TOKEN_EXPIRY });

const hashToken = (rawToken) => crypto.createHash("sha256").update(rawToken).digest("hex");

const issueRefreshToken = async (userId, remember) => {
  const rawToken = crypto.randomBytes(32).toString("hex");
  const ttl = remember ? REFRESH_TOKEN_TTL.remember : REFRESH_TOKEN_TTL.default;

  await RefreshToken.create({
    userId,
    tokenHash: hashToken(rawToken),
    remember,
    expiresAt: new Date(Date.now() + ttl),
  });

  return rawToken;
};

const issueSession = async (user, remember) => {
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(user._id, user.role),
    issueRefreshToken(user._id, remember),
  ]);
  return { accessToken, refreshToken };
};

const stripPassword = (userDoc) => {
  const { password: _password, ...rest } = userDoc.toObject();
  return rest;
};

const signup = async ({ name, email, password }) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  // role is never accepted from the client — every signup is a plain customer account.
  const user = await UserModel.create({ name, email, password: hashedPassword });
  const { accessToken, refreshToken } = await issueSession(user, false);

  return { user: stripPassword(user), accessToken, refreshToken };
};

const login = async ({ email, password, rememberMe }) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw new ApiError(404, "No account found with this email");
  }

  if (!user.password) {
    throw new ApiError(401, "This account uses Google sign-in — continue with Google instead");
  }

  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new ApiError(401, "Incorrect password");
  }

  const { accessToken, refreshToken } = await issueSession(user, Boolean(rememberMe));

  return { user: stripPassword(user), accessToken, refreshToken };
};

/** Verifies a Google ID token server-side (never trust a client-asserted email), then finds or creates the matching account. */
const loginWithGoogle = async ({ idToken, rememberMe }) => {
  if (!googleClient) {
    throw new ApiError(503, "Google sign-in isn't configured on this server");
  }
  if (!idToken) {
    throw new ApiError(400, "idToken is required");
  }

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({ idToken, audience: env.googleClientId });
    payload = ticket.getPayload();
  } catch {
    throw new ApiError(401, "Invalid Google token");
  }

  if (!payload?.email_verified) {
    throw new ApiError(401, "Google account email is not verified");
  }

  let user = await UserModel.findOne({ email: payload.email });
  if (!user) {
    // `image` is left unset (not payload.picture) — the rest of the app treats it as an
    // /uploads filename, not an arbitrary external URL, so mixing the two would break rendering.
    user = await UserModel.create({
      name: payload.name || payload.email,
      email: payload.email,
      authProvider: "google",
    });
  }

  const { accessToken, refreshToken } = await issueSession(user, Boolean(rememberMe));

  return { user: stripPassword(user), accessToken, refreshToken };
};

/** Rotates a refresh token: the old one is invalidated the moment a new pair is issued, so a stolen-and-replayed token stops working as soon as the legitimate client refreshes. */
const refresh = async (rawToken) => {
  if (!rawToken) {
    throw new ApiError(401, "Refresh token required");
  }

  const stored = await RefreshToken.findOne({ tokenHash: hashToken(rawToken) });
  if (!stored || stored.expiresAt < new Date()) {
    throw new ApiError(401, "Refresh token invalid or expired");
  }

  const user = await UserModel.findById(stored.userId);
  if (!user) {
    await RefreshToken.deleteOne({ _id: stored._id });
    throw new ApiError(401, "Account no longer exists");
  }

  await RefreshToken.deleteOne({ _id: stored._id });
  const [accessToken, refreshToken] = await Promise.all([
    signAccessToken(user._id, user.role),
    issueRefreshToken(user._id, stored.remember),
  ]);

  return { accessToken, refreshToken };
};

const logout = async (rawToken) => {
  if (!rawToken) return;
  await RefreshToken.deleteOne({ tokenHash: hashToken(rawToken) });
};

module.exports = { signup, login, loginWithGoogle, refresh, logout };
