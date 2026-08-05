const ApiError = require("../utils/ApiError");

/** Gate a route to specific roles. Must run after requireAuth, which sets req.userRole. */
const requireRole =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.userRole)) {
      return next(new ApiError(403, "You don't have permission to do that"));
    }
    next();
  };

module.exports = requireRole;
