import { TYPES } from "../../src/dependency-injection/types";
import { Connection, createConnection, getConnection } from "typeorm";
import { container } from "../../src/dependency-injection/bind";
import { EnviromentMock } from "../mock/EnviromentMock";
import { IEnviroment } from "../../src/configuration/Enviroment";
import { IDatabaseConnection } from "../../src/database/DatabaseConnection";
import { LogMock } from "../mock/LogMock";
import { IBlockFrostService } from "../../src/service/BlockFrostService";
import { BlockFrostServiceMock } from "../mock/BlockFrostServiceMock";
import {
  ICoinGeckoClient,
  ICoinGeckoService,
} from "../../src/service/CoinGeckoService";
import {
  CoinGeckoClientMock,
  CoinGeckoServiceMock,
} from "../mock/CoinGeckoMock";
import { ILogger } from "../../src/utility/Logger";
import { MainService } from "../../src/service/MainService";
import { SqljsConnectionOptions } from "typeorm/driver/sqljs/SqljsConnectionOptions";
import { BlockEntity } from "../../src/entity/BlockEntity";
import { seed } from "../seed/seed";

container.snapshot();

const mockContainer = container;

mockContainer
  .rebind<IEnviroment>(TYPES.Enviroment)
  .toConstantValue(EnviromentMock);

let isStartup = true;

// database
mockContainer
  .rebind<IDatabaseConnection>(TYPES.DatabaseConnection)
  .toDynamicValue(async () => {
    const databaseConfiguration: SqljsConnectionOptions = {
      name: "test",
      entities: [BlockEntity],
      type: "sqljs",
      synchronize: true,
      dropSchema: true,
    };
    let connection;
    if (isStartup) {
      connection = await createConnection(databaseConfiguration);
      isStartup = false;
    } else {
      connection = getConnection("test");
    }
    return connection;
  })
  .inSingletonScope();

// utility
mockContainer.rebind<ILogger>(TYPES.Logger).toConstantValue(LogMock);

// service
mockContainer
  .rebind<IBlockFrostService>(TYPES.BlockFrostService)
  .toConstantValue(BlockFrostServiceMock);

mockContainer
  .rebind<ICoinGeckoClient>(TYPES.CoinGeckoClient)
  .toConstantValue(CoinGeckoClientMock);

mockContainer
  .rebind<ICoinGeckoService>(TYPES.CoinGeckoService)
  .toConstantValue(CoinGeckoServiceMock);

mockContainer.rebind<MainService>(TYPES.MainService).to(MainService);

export { mockContainer };
