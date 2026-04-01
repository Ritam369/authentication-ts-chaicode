class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = "Bad Request") {
    return new ApiError(400, message);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }
  static conflict(message = "Conflict") {
    return new ApiError(409, message);
  }
  static forbidden(message = "forbidden") {
    return new ApiError(403, message);
  }
  static notfound(message = "notfound") {
    return new ApiError(404, message);
  }
  static serverError(message = "server Error") {
    return new ApiError(500, message);
  }
}

export default ApiError;
