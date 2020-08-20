const { createLogger, transports, format } = require("winston");
// require("winston-daily-rotate-file");
// const fs = require("fs");
// const path = require("path");

// const env = process.env.NODE_ENV || "development";
// const logDir = "logs";
// const datePatternConfiguration = {
//   default: "YYYY-MM-DD",
//   everHour: "YYYY-MM-DD-HH",
//   everMinute: "YYYY-MM-DD-THH-mm",
// };
// const numberOfDaysToKeepLog = 30;
// const fileSizeToRotate = 5242880; // in megabyte

// const dailyRotateFileTransport = new transports.DailyRotateFile({
//   filename: `${logDir}/%DATE%-results.log`,
//   datePattern: datePatternConfiguration.everHour,
//   zippedArchive: true,
//   maxSize: `${fileSizeToRotate}m`,
//   maxFiles: `${numberOfDaysToKeepLog}d`,
// });

// const logger = createLogger({
//   // change level if in dev environment versus production
//   level: env === "development" ? "verbose" : "info",
//   handleExceptions: true,
//   format: format.combine(
//     format.label({ label: path.basename(module.parent.filename) }),
//     format.timestamp({
//       format: "YYYY-MM-DD HH:mm:ss",
//     }),
//     format.printf(
//       (info) =>
//         `${info.timestamp}[${info.label}] ${info.level}: ${JSON.stringify(
//           info.message,
//           null,
//           2
//         )}`
//     )
//   ),
//   transports: [
//     new transports.Console({
//       level: "info",
//       handleExceptions: true,
//       format: format.combine(
//         format.label({ label: path.basename(module.parent.filename) }),
//   format.colorize(),
//   format.printf(
//     (info) =>
//       `${info.timestamp}[${info.label}] ${info.level}: ${info.message}`
//   )
// ),
//     }),
//     new transports.File({

//     }),
//     dailyRotateFileTransport,
//   ],
// });

// logger.stream = {
//   write: (message) => {
//     logger.info(message);
//   },
// };

// module.exports = logger;

// module.exports = logger;

const winston = require("winston");
const path = require("path");
const PROJECT_ROOT = path.join(__dirname, "..");
const appRoot = require("app-root-path");

const logger = createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss",
    }),
    winston.format.printf((info) => {
      if (info.level === "error") {
        return info.stack || info.message;
      }
      return `[${info.level.toUpperCase()}] ${info.timestamp} ${JSON.stringify(
        info.message,
        null,
        2
      )}`;
    })
  ),
  transports: [
    new winston.transports.File({
      level: "info",
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      timestamp: true,
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: format.combine(
        format.label({ label: path.basename(module.parent.filename) }),
        format.colorize(),
        format.printf(
          (info) =>
            `${info.timestamp} ${info.level}: ${JSON.stringify(
              info.message,
              null,
              2
            )}`
        )
      ),
    }),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function(message) {
    logger.info(message);
    logger.error(message);
  },
};

// A custom logger interface that wraps winston, making it easy to instrument
// code and still possible to replace winston in the future.

module.exports.debug = module.exports.log = function() {
  logger.debug.apply(logger, formatLogArguments(arguments));
};

module.exports.info = function() {
  logger.info.apply(logger, formatLogArguments(arguments));
};

module.exports.warn = function() {
  logger.warn.apply(logger, formatLogArguments(arguments));
};

module.exports.error = function() {
  logger.error.apply(logger, formatLogArguments(arguments));
};

module.exports.stream = logger.stream;

/**
 * Attempts to add file and line number info to the given log arguments.
 */
function formatLogArguments(args) {
  args = Array.prototype.slice.call(args);

  const stackInfo = getStackInfo(1);

  if (stackInfo) {
    // get file path relative to project root
    const calleeStr = "(" + stackInfo.relativePath + ":" + stackInfo.line + ")";

    if (typeof args[0] === "string") {
      args[0] = calleeStr + " " + args[0];
    } else {
      args.unshift(calleeStr);
    }
  }

  return args;
}

/**
 * Parses and returns info about the call stack at the given index.
 */
function getStackInfo(stackIndex) {
  // get call stack, and analyze it
  // get all file, method, and line numbers
  const stacklist = new Error().stack.split("\n").slice(3);

  // stack trace format:
  // http://code.google.com/p/v8/wiki/JavaScriptStackTraceApi
  // do not remove the regex expresses to outside of this method (due to a BUG in node.js)
  const stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi;
  const stackReg2 = /at\s+()(.*):(\d*):(\d*)/gi;

  const s = stacklist[stackIndex] || stacklist[0];
  const sp = stackReg.exec(s) || stackReg2.exec(s);

  if (sp && sp.length === 5) {
    return {
      method: sp[1],
      relativePath: path.relative(PROJECT_ROOT, sp[2]),
      line: sp[3],
      pos: sp[4],
      file: path.basename(sp[2]),
      stack: stacklist.join("\n"),
    };
  }
}
