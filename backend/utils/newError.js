class newError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.code = statusCode;
    this.message = message;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = newError;
