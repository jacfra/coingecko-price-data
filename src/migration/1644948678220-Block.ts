import {MigrationInterface, QueryRunner} from "typeorm";

export class Block1644948678220 implements MigrationInterface {
    name = 'Block1644948678220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "block_entity" ("id" SERIAL NOT NULL, "hash" character varying NOT NULL, "height" character varying NOT NULL, "price" character varying, CONSTRAINT "PK_c3ddd57793960562837e8a402f1" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "block_entity"`);
    }

}
