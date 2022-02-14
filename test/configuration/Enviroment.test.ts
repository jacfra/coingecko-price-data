process.env.DB_HST = "host";
process.env.DB_USR = "usr";
process.env.DB_PW = "pw";
process.env.DB_NM = "nm";
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

  test(`enviroment.DB_NM == process.env.DB_NM`, () => {
    expect(enviroment.DB_NM).toBe(process.env.DB_NM);
  });

  test(`enviroment.DB_USR == process.env.DB_USR`, () => {
    expect(enviroment.DB_USR).toBe(process.env.DB_USR);
  });

  test(`enviroment.DB_PW == process.env.DB_PW`, () => {
    expect(enviroment.DB_PW).toBe(process.env.DB_PW);
  });

  test(`enviroment.DB_HST == process.env.DB_HST`, () => {
    expect(enviroment.DB_HST).toBe(process.env.DB_HST);
  });
});
