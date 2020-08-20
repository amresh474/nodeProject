module.exports = class AppError extends Error {
  constructor(httpStatusCode, errCode, message, status, desc) {
    // Calling parent constructor of base Error class.
    super(message);

    // Saving class name in the property of our custom error as a shortcut.
    /** removing name for now because not required */
    // this.name = this.constructor.name;
    // Capturing stack trace, excluding constructor call from it.
    Error.captureStackTrace(this, this.constructor);
    // set httpcode
    this.httpStatusCode = httpStatusCode;
    // set custom error code
    this.code = errCode || 500;
    // error message
    this.msg = message;
    // You can use any additional properties you want.
    // I'm going to use preferred HTTP status for this error types.
    // `500` is the default value if not specified.
    this.status = status || false;
    this.description = desc || null;
  }
};
