import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import { TYPES } from "./dependency-injection/types";
import { container } from "./dependency-injection/bind";
import { MainService } from "./service/MainService";
import delay from "delay";
import { Logger } from "log4js";

(async () => {
  let log = await container.getAsync<Logger>(TYPES.Logger);
  let main = await container.getAsync<MainService>(TYPES.MainService);

  // looks for the a new block every 15 seconds
  // ignores if dupe, otherwise get price data and insert to db
  // use while loop because setInterval chokes on @inject
  while (true) {
    await delay(15 * 1000);
    try {
      await main.handleLatest();
    } catch (e) {
      log.info("Fatal Application Error");
      log.fatal(e);
      break;
    }
  }
})();
