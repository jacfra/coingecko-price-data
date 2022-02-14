import { LogMock } from "../../test/mock/LogMock";

describe("Logger", () => {
  test("log.trace", () => {
    LogMock.trace("trace log");
    expect(LogMock.trace).toBeCalled();
  });

  test("log.debug", () => {
    LogMock.debug("debug log");
    expect(LogMock.debug).toBeCalled();
  });

  test("log.info", () => {
    LogMock.info("info log");
    expect(LogMock.info).toBeCalled();
  });

  test("log.warn", () => {
    LogMock.warn("warn log");
    expect(LogMock.warn).toBeCalled();
  });

  test("log.error", () => {
    LogMock.error("error log");
    expect(LogMock.error).toBeCalled();
  });

  test("log.fatal", () => {
    LogMock.fatal("fatal log");
    expect(LogMock.fatal).toBeCalled();
  });
});
