import "reflect-metadata";
import { TYPES } from "../../src/dependency-injection/types";
import { IBlockFrostService } from "../../src/service/BlockFrostService";
import { mockContainer } from "../dependency-injection/mockBind";

beforeEach(() => {
  mockContainer.snapshot();
});

afterEach(() => {
  mockContainer.restore();
  jest.clearAllMocks();
});

describe("BlockFrostService", () => {
  test(`blockFrostService.blockLatest`, async () => {
    const blockFrostService = await mockContainer.getAsync<IBlockFrostService>(
      TYPES.BlockFrostService
    );

    const result = await blockFrostService.blocksLatest();
    expect(blockFrostService.blocksLatest).toBeCalled();
  });
});
