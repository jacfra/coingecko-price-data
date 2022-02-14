import { configure, getLogger, Logger } from "log4js";

const logLevel = "INFO";

export interface ILogger {
  trace(message: any, ...args: any[]): void;
  debug(message: any, ...args: any[]): void;
  info(message: any, ...args: any[]): void;
  warn(message: any, ...args: any[]): void;
  error(message: any, ...args: any[]): void;
  fatal(message: any, ...args: any[]): void;
}

configure({
  appenders: {
    app: {
      type: "dateFile",
      filename: "logs/app.log",
      keepFileExt: true,
      alwaysIncludePattern: false,
      fileNameSep: ".",
      pattern: "yyyy-MM-dd",
      numBackups: 1,
    },
    errorFile: {
      type: "dateFile",
      filename: "logs/errors.log",
      keepFileExt: true,
      alwaysIncludePattern: false,
      fileNameSep: ".",
      pattern: "yyyy-MM-dd",
      numBackups: 1,
    },
    errors: {
      type: "logLevelFilter",
      level: "ERROR",
      appender: "errorFile",
    },
    out: { type: "stdout" },
  },
  categories: {
    default: {
      appenders: ["app", "errors", "out"],
      level: logLevel,
    },
  },
});

const Log = getLogger();

export { Log, Logger };
