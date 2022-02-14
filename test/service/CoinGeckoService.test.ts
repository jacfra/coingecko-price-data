import "reflect-metadata";
import { TYPES } from "../../src/dependency-injection/types";
import { ICoinGeckoService } from "../../src/service/CoinGeckoService";
import { mockContainer } from "../dependency-injection/mockBind";

beforeEach(() => {
  mockContainer.snapshot();
});

afterEach(() => {
  mockContainer.restore();
  jest.clearAllMocks();
});

describe("CoinGeckoService", () => {
  test(`CoinGeckoService.getCardanoPrice`, async () => {
    const coinGeckoService = await mockContainer.getAsync<ICoinGeckoService>(
      TYPES.CoinGeckoService
    );

    const price = await coinGeckoService.getCardanoPrice();
    expect(price).toBe(1);
    expect(coinGeckoService.getCardanoPrice).toBeCalled();
  });
});
