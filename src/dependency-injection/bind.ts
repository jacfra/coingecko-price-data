import { Container, interfaces } from "inversify";
import { ILogger, Log } from "../utility/Logger";
import { MainService } from "../service/MainService";
import { CoinGeckoClient } from "coingecko-api-v3";
import { BlockFrostAPI } from "@blockfrost/blockfrost-js";
import {
  DatabaseConnection,
  IDatabaseConnection,
} from "../database/DatabaseConnection";
import { Enviroment, IEnviroment } from "../configuration/Enviroment";
import { createConnection } from "typeorm";
import {
  CoinGeckoService,
  ICoinGeckoClient,
  ICoinGeckoService,
} from "../service/CoinGeckoService";
import { TYPES } from "./types";
import { IBlockFrostService } from "../service/BlockFrostService";
import { BlockEntity } from "../entity/BlockEntity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const container = new Container();

container.bind<IEnviroment>(TYPES.Enviroment).to(Enviroment);

// database
container
  .bind<IDatabaseConnection>(TYPES.DatabaseConnection)
  .toDynamicValue(async (context: interfaces.Context) => {
    const enviroment = context.container.get<IEnviroment>(TYPES.Enviroment);

    const databaseConfiguration: PostgresConnectionOptions = {
      host: enviroment.DB_HST,
      port: 5432,
      username: enviroment.DB_USR,
      password: enviroment.DB_PW,
      database: enviroment.DB_NM,
      entities: [BlockEntity],
      type: "postgres",
    };

    return await createConnection(databaseConfiguration);
  })
  .inSingletonScope();

// utility
container.bind<ILogger>(TYPES.Logger).toConstantValue(Log);

// service
container
  .bind<IBlockFrostService>(TYPES.BlockFrostService)
  .toDynamicValue((context: interfaces.Context) => {
    const env = context.container.get<Enviroment>(TYPES.Enviroment);

    const BlockFrostApi = new BlockFrostAPI({
      projectId: env.BLOCK_FROST_API_KEY,
    });

    return BlockFrostApi;
  })
  .inSingletonScope();

container
  .bind<ICoinGeckoClient>(TYPES.CoinGeckoClient)
  .toDynamicValue(() => {
    return new CoinGeckoClient({
      timeout: 5000,
      autoRetry: true,
    });
  })
  .inSingletonScope();

container
  .bind<ICoinGeckoService>(TYPES.CoinGeckoService)
  .to(CoinGeckoService)
  .inSingletonScope();

container.bind<MainService>(TYPES.MainService).to(MainService);

export { container };
