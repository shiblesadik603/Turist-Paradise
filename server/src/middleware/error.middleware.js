/** Centralized 404 + error handling: converts an ApiError to its status/message, else 500s. */
const ApiError = require("../utils/ApiError");

const notFound = (req, res, next) => {
  next(new ApiError(404, `Route not found: ${req.originalUrl}`));
};

// _next is required so Express recognizes this as error-handling middleware (needs 4 params)
const errorHandler = (err, req, res, _next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      data: err.details,
    });
  }

  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal server error",
    data: null,
  });
};

module.exports = { notFound, errorHandler };
