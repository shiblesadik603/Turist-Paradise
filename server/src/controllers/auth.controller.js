/** POST /auth/signup, POST /auth/login — validate input, delegate to authService. */
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

  const { user, token } = await authService.signup({ name: name.trim(), email, password });
  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: { user, token },
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

  const { user, token } = await authService.login({
    email,
    password,
    rememberMe: Boolean(rememberMe),
  });
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user, token },
  });
});

module.exports = { signup, login };
