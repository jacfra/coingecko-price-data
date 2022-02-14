import { injectable } from "inversify";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@injectable()
@Entity()
export class BlockEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  hash: string;

  @Column()
  height: string;

  @Column({ nullable: true })
  price: string;
}
