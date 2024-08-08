const { StatusCodes } = require("http-status-codes");

// Custom error class to handle application errors
class AppError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Error handler middleware
function errorHandler(err, req, res, _next) {
  console.log(err);
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
}

module.exports = { AppError, errorHandler };
