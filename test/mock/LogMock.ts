import { ILogger } from "../../src/utility/Logger";
import { NOT_CORRECTLY_MOCKED_ERROR } from "./_constant";

const LogMock: ILogger = {
  trace: function (message: any, ...args: any[]): void {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
  debug: function (message: any, ...args: any[]): void {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
  info: function (message: any, ...args: any[]): void {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
  warn: function (message: any, ...args: any[]): void {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
  error: function (message: any, ...args: any[]): void {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
  fatal: function (message: any, ...args: any[]): void {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
};

LogMock.trace = jest.fn();
LogMock.debug = jest.fn();
LogMock.info = jest.fn();
LogMock.warn = jest.fn();
LogMock.error = jest.fn();
LogMock.fatal = jest.fn();

export { LogMock };
