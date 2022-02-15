process.env.BLOCK_FROST_API_KEY = "key";

import "reflect-metadata";
import { Enviroment } from "../../src/configuration/Enviroment";

describe("database configuration", () => {
  const enviroment = new Enviroment();
  test(`enviroment.BLOCK_FROST_API_KEY == process.env.BLOCK_FROST_API_KEY`, () => {
    expect(enviroment.BLOCK_FROST_API_KEY).toBe(
      process.env.BLOCK_FROST_API_KEY
    );
  });
});
