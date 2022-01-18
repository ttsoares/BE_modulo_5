import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, OneToMany, PrimaryColumn } from "typeorm";

import { Message } from "./MessageEntitie";

@Entity({ name: "users" })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
    uid?: number;

  @Column()
    name: string;

  @Column()
    password: string;

  @OneToMany('Message', (message: Message) => message.user, {onDelete:"CASCADE"})
    message!: Message[];

  constructor( name: string, password: string ) {
    super();
    this.name = name;
    this.password = password;
  }
}
