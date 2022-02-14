import "reflect-metadata";
import { IDatabaseConnection } from "../../src/database/DatabaseConnection";
import { TYPES } from "../../src/dependency-injection/types";
import { BlockEntity } from "../../src/entity/BlockEntity";
import { IBlockFrostService } from "../../src/service/BlockFrostService";
import { ICoinGeckoService } from "../../src/service/CoinGeckoService";
import { MainService } from "../../src/service/MainService";
import { ILogger } from "../../src/utility/Logger";
import { mockContainer } from "../dependency-injection/mockBind";
import { seed } from "../seed/seed";

beforeEach(async () => {
  mockContainer.snapshot();
  const databaseConnection = await mockContainer.getAsync<IDatabaseConnection>(
    TYPES.DatabaseConnection
  );
  await seed(databaseConnection);
});

afterEach(async () => {
  mockContainer.restore();
  jest.clearAllMocks();
});

describe("MainService", () => {
  test(`MainService.handleLatest`, async () => {
    const databaseConnection =
      await mockContainer.getAsync<IDatabaseConnection>(
        TYPES.DatabaseConnection
      );

    const blockFrostService = await mockContainer.getAsync<IBlockFrostService>(
      TYPES.BlockFrostService
    );

    const coinGeckoService = await mockContainer.getAsync<ICoinGeckoService>(
      TYPES.CoinGeckoService
    );

    const logger = await mockContainer.getAsync<ILogger>(TYPES.Logger);

    const mainService = new MainService(
      databaseConnection,
      logger,
      blockFrostService,
      coinGeckoService
    );

    // dont query the seed data we arent testing the mock path
    blockFrostService.blocksLatest = jest.fn(async () => {
      return { hash: "hash", height: 101 };
    });

    await mainService.handleLatest();

    expect(blockFrostService.blocksLatest).toBeCalled();
    expect(logger.info).toBeCalled();
    expect(coinGeckoService.getCardanoPrice).toBeCalled();

    const connection = await mockContainer.getAsync<IDatabaseConnection>(
      TYPES.DatabaseConnection
    );

    const mockResult = { hash: "hash", price: "1", height: "100" };

    const blockFromDatabase = await connection
      .createQueryBuilder()
      .select("block_entity")
      .from(BlockEntity, "block_entity")
      .where(mockResult)
      .getOne();

    expect(blockFromDatabase.hash).toEqual(mockResult.hash);
    expect(blockFromDatabase.height).toEqual(mockResult.height);
    expect(blockFromDatabase.price).toEqual(mockResult.price);
  });

  test(`MainService.handleLatest return early on duplicate`, async () => {
    const databaseConnection =
      await mockContainer.getAsync<IDatabaseConnection>(
        TYPES.DatabaseConnection
      );

    const blockFrostService = await mockContainer.getAsync<IBlockFrostService>(
      TYPES.BlockFrostService
    );

    const coinGeckoService = await mockContainer.getAsync<ICoinGeckoService>(
      TYPES.CoinGeckoService
    );

    const logger = await mockContainer.getAsync<ILogger>(TYPES.Logger);

    const mainService = new MainService(
      databaseConnection,
      logger,
      blockFrostService,
      coinGeckoService
    );

    // get the seed data from the database to test the dupe path
    blockFrostService.blocksLatest = jest.fn(async () => {
      return { hash: "hash", height: 100 };
    });

    await mainService.handleLatest();

    expect(blockFrostService.blocksLatest).toBeCalled();
    expect(logger.info).toBeCalled();
    expect(coinGeckoService.getCardanoPrice).not.toBeCalled();
  });
});
