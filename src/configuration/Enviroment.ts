import { injectable } from "inversify";

export interface IEnviroment {
  DB_NM: string;
  DB_USR: string;
  DB_PW: string;
  DB_HST: string;
  BLOCK_FROST_API_KEY: string;
}

@injectable()
export class Enviroment implements IEnviroment {
  constructor() {
    this.BLOCK_FROST_API_KEY = process.env.BLOCK_FROST_API_KEY;
    this.DB_NM = process.env.DB_NM;
    this.DB_USR = process.env.DB_USR;
    this.DB_PW = process.env.DB_PW;
    this.DB_HST = process.env.DB_HST;
  }
  DB_NM: string;
  DB_USR: string;
  DB_PW: string;
  DB_HST: string;
  BLOCK_FROST_API_KEY: string;
}
