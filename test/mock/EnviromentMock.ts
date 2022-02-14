import { IEnviroment } from "../../src/configuration/Enviroment";
import { MOCK_STRING } from "./_constant";

const EnviromentMock: IEnviroment = {
  DB_NM: MOCK_STRING,
  DB_USR: MOCK_STRING,
  DB_PW: MOCK_STRING,
  DB_HST: MOCK_STRING,
  BLOCK_FROST_API_KEY: MOCK_STRING,
};

export { EnviromentMock };
