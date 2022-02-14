import { QueryRunner, SelectQueryBuilder } from "typeorm";
import { Connection } from "typeorm";

export interface IDatabaseConnection {
  createQueryBuilder(queryRunner?: QueryRunner): SelectQueryBuilder<any>;
  close(): Promise<void>;
  connect(): Promise<this>;
  isConnected: boolean;
  synchronize(dropBeforeSync?: boolean): Promise<void>;
  dropDatabase(): Promise<void>;
}

export type DatabaseConnection = Connection;
