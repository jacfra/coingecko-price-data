import { Connection } from "typeorm";
import { IDatabaseConnection } from "../../src/database/DatabaseConnection";
import { BlockEntity } from "../../src/entity/BlockEntity";

export const seedBlockEntityData = async (connection: IDatabaseConnection) => {
  await connection
    .createQueryBuilder()
    .insert()
    .into(BlockEntity)
    .values(BlockEntitySeedData)
    .execute();
};

const BlockEntitySeedData: BlockEntity[] = [
  { id: "2", hash: "hash", height: "100", price: "1" },
];
