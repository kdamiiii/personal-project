export const respondWithHttpError = (err, res) => {
  let statusCode = 500; // Default to Internal Server Error
  let message = "Internal Server Error";

  // Check for known error types
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = err.message || "Bad Request - Validation Error";
  } else if (
    err.name === "UnauthorizedError" ||
    err.message.includes("Unauthorized")
  ) {
    statusCode = 401;
    message = "Unauthorized - Invalid credentials";
  } else if (err.name === "ForbiddenError") {
    statusCode = 403;
    message = "Forbidden - You do not have permission to access this resource";
  } else if (err.name === "NotFoundError") {
    statusCode = 404;
    message = err.message || "Not Found";
  } else if (err.statusCode === 422) {
    statusCode = 422;
    message = err.message || "Unprocessable Entity";
  } else if (err.statusCode === 404) {
    statusCode = 404;
    message = "Resource not found";
  } else if (err.statusCode === 400) {
    statusCode = 400;
    message = err.message || "Bad Request";
  } else if (
    err.name === "SequelizeValidationError" ||
    err.message.includes("ValidationError")
  ) {
    statusCode = 400;
    message = err.message || "Missing Fields";
  }
  res.status(statusCode).json({ message });
};
