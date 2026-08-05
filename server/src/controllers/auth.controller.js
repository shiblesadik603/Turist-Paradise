/** POST /auth/signup, POST /auth/login, POST /auth/google, POST /auth/refresh, POST /auth/logout. */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const authService = require("../services/authService");
const { isValidEmail, getPasswordError } = require("../utils/validators");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !name.trim()) {
    throw new ApiError(400, "Name is required");
  }
  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter a valid email address");
  }
  const passwordError = getPasswordError(password);
  if (passwordError) {
    throw new ApiError(400, passwordError);
  }

  const { user, accessToken, refreshToken } = await authService.signup({
    name: name.trim(),
    email,
    password,
  });
  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: { user, accessToken, refreshToken },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password, rememberMe } = req.body;

  if (!isValidEmail(email)) {
    throw new ApiError(400, "Please enter a valid email address");
  }
  if (!password) {
    throw new ApiError(400, "Password is required");
  }

  const { user, accessToken, refreshToken } = await authService.login({
    email,
    password,
    rememberMe: Boolean(rememberMe),
  });
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user, accessToken, refreshToken },
  });
});

const googleLogin = asyncHandler(async (req, res) => {
  const { idToken, rememberMe } = req.body;

  const { user, accessToken, refreshToken } = await authService.loginWithGoogle({
    idToken,
    rememberMe: Boolean(rememberMe),
  });
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user, accessToken, refreshToken },
  });
});

const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const tokens = await authService.refresh(refreshToken);
  res.status(200).json({ success: true, message: "Token refreshed", data: tokens });
});

const logout = asyncHandler(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(200).json({ success: true, message: "Logged out", data: null });
});

module.exports = { signup, login, googleLogin, refresh, logout };
