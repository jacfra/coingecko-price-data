import { IDatabaseConnection } from "../../src/database/DatabaseConnection";
import { seedBlockEntityData } from "./BlockEntityMock";

export const seed = async (connection: IDatabaseConnection) => {
  await connection.dropDatabase();
  await connection.synchronize();
  await seedBlockEntityData(connection);
};
