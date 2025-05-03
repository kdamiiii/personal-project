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
  } else if (err.name === "SequelizeValidationError") {
    statusCode = 400;
    message = err.message || "Missing Fields";
  } else if (err.name === "SequelizeUniqueConstraintError") {
    statusCode = 400;
    message = "Fields must be Unique (Record already exists)";
  } else if (err.name === "NotFound") {
    statusCode = 404;
    message = err.message || "Does not exist";
  } else if (err.name === "SequelizeDatabaseError") {
    statusCode = 400;
    message = "Invalid input";
  } else if (err.message.includes("ValidationError")) {
    statusCode = 400;
    message = "Invalid input";
  }
  res.status(statusCode).json({ message });
};

export class HTTPError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}
