import { CoinGeckoClient, SimplePriceResponse } from "coingecko-api-v3";
import { inject, injectable } from "inversify";
import { TYPES } from "../dependency-injection/types";
import { ILogger } from "../utility/Logger";

export interface ICoinGeckoClient {
  simplePrice(input: {
    vs_currencies: string;
    ids: string;
    include_market_cap?: boolean;
    include_24hr_vol?: boolean;
    include_24hr_change?: boolean;
    include_last_updated_at?: boolean;
  }): Promise<SimplePriceResponse>;
}

export interface ICoinGeckoService {
  getCardanoPrice(): Promise<number>;
}

@injectable()
export class CoinGeckoService implements ICoinGeckoService {
  constructor(
    @inject(TYPES.CoinGeckoClient) private coinGeckoClient: ICoinGeckoClient,
    @inject(TYPES.Logger) private log: ILogger
  ) {}

  async getCardanoPrice(): Promise<number> {
    const simplePrice: SimplePriceResponse =
      await this.coinGeckoClient.simplePrice({
        vs_currencies: "usd",
        ids: "cardano",
        include_market_cap: false,
        include_24hr_vol: false,
        include_24hr_change: false,
        include_last_updated_at: false,
      });

    return simplePrice["cardano"]["usd"];
  }
}
