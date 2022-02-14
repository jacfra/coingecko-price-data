import { inject, injectable } from "inversify";
import { TYPES } from "../dependency-injection/types";
import { BlockEntity } from "../entity/BlockEntity";
import { IBlockFrostService } from "./BlockFrostService";
import { ICoinGeckoService } from "./CoinGeckoService";
import { IDatabaseConnection } from "../database/DatabaseConnection";
import { ILogger } from "../utility/Logger";

export interface IMainService {
  handleLatest(): Promise<void>;
}

@injectable()
export class MainService {
  constructor(
    @inject(TYPES.DatabaseConnection)
    private databaseConnection: IDatabaseConnection,
    @inject(TYPES.Logger)
    private log: ILogger,
    @inject(TYPES.BlockFrostService)
    private blockFrostService: IBlockFrostService,
    @inject(TYPES.CoinGeckoService)
    private coinGeckoService: ICoinGeckoService
  ) {}

  async handleLatest() {
    let latestBlock;
    try {
      latestBlock = await this.blockFrostService.blocksLatest();
    } catch (e) {
      this.log.info("Error: Failed To Get Latest Block From BlockFrost");
      this.log.error(e);
      return;
    }

    this.log.debug(`Latest Block: ${latestBlock.height}`);

    const blockFromDatabase = await this.databaseConnection
      .createQueryBuilder()
      .select("block_entity")
      .from(BlockEntity, "block_entity")
      .where({ height: latestBlock.height })
      .getOne()
      .catch(e => {
        this.log.error(e);
      });

    if (blockFromDatabase) {
      this.log.info(`Duplicate Block: ${latestBlock.height}`);
      return;
    }

    let cardanoPrice;
    try {
      cardanoPrice = await this.coinGeckoService.getCardanoPrice();
    } catch (e) {
      this.log.info("Error: Failed To Get Cardano Price From CoinGeckoService");
      this.log.error(e);
      return;
    }

    this.log.debug(`price:${cardanoPrice}`);

    const newBlock = new BlockEntity();
    newBlock.hash = latestBlock.hash;
    newBlock.height = latestBlock.height.toString();
    newBlock.price = cardanoPrice.toString();

    this.log.debug(newBlock);

    await this.databaseConnection
      .createQueryBuilder()
      .insert()
      .into(BlockEntity)
      .values(newBlock)
      .execute()
      .catch(e => {
        this.log.error(e);
      });

    this.log.info(`New Block: ${newBlock.height}`);
  }
}
