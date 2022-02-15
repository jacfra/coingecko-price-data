import { injectable } from "inversify";

export interface IEnviroment {
  BLOCK_FROST_API_KEY: string;
}

@injectable()
export class Enviroment implements IEnviroment {
  constructor() {
    this.BLOCK_FROST_API_KEY = process.env.BLOCK_FROST_API_KEY;
  }
  BLOCK_FROST_API_KEY: string;
}
