import { SimplePriceResponse } from "coingecko-api-v3";
import {
  ICoinGeckoClient,
  ICoinGeckoService,
} from "../../src/service/CoinGeckoService";
import { NOT_CORRECTLY_MOCKED_ERROR } from "./_constant";

const CoinGeckoServiceMock: ICoinGeckoService = {
  getCardanoPrice: function (): Promise<number> {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
};
CoinGeckoServiceMock.getCardanoPrice = jest
  .fn()
  .mockImplementation(async () => {
    return 1;
  });

const CoinGeckoClientMock: ICoinGeckoClient = {
  simplePrice(input: {
    vs_currencies: string;
    ids: string;
    include_market_cap?: boolean;
    include_24hr_vol?: boolean;
    include_24hr_change?: boolean;
    include_last_updated_at?: boolean;
  }): Promise<SimplePriceResponse> {
    throw new Error(NOT_CORRECTLY_MOCKED_ERROR);
  },
};

CoinGeckoClientMock.simplePrice = jest.fn().mockImplementation(() => {
  return { cardano: { usd: 1 } };
});

export { CoinGeckoServiceMock, CoinGeckoClientMock };
