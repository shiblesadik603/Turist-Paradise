/** POST /auth/signup, POST /auth/login — validate input, delegate to authService. */
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const authService = require("../services/authService");

const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new ApiError(400, "name, email, and password are required");
  }

  const { user, token } = await authService.signup({ name, email, password });
  res.status(201).json({
    success: true,
    message: "Account created successfully",
    data: { user, token },
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email and password are required");
  }

  const { user, token } = await authService.login({ email, password });
  res.status(200).json({
    success: true,
    message: "Login successful",
    data: { user, token },
  });
});

module.exports = { signup, login };
