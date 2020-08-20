const AppError = require('./AppError');

module.exports = {
  To: promise => promise.then(data => [null, data]).catch(err => [err, null]),
  // For external apis
  TIR: promise => promise.then(data => [null, data])
    .catch((err) => {
      if (err.response) {
        return [err, err.response];
      }
      return [err, null];
    }),
  TE: (httpStatusCode, codes, description) => {
    if (description) {
      Object.assign(codes, { description });
    }
    throw new AppError(httpStatusCode, codes.statusCode, codes.msg,
      codes.status, codes.description);
  },
};
