/** Verifies the Bearer JWT and sets req.userId, or rejects with 401. */
const jwt = require("jsonwebtoken");
const env = require("../config/env");
const ApiError = require("../utils/ApiError");

const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return next(new ApiError(401, "Authentication token missing"));
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.userId = payload.userId;
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

module.exports = requireAuth;
