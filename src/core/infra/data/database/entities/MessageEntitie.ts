import { BaseEntity, Column, PrimaryGeneratedColumn, Entity, ManyToOne, PrimaryColumn, JoinColumn } from "typeorm";

import { User } from "./UserEntitie"

@Entity({ name: "messages" })
export class Message extends BaseEntity {
  @PrimaryGeneratedColumn()
    uid?: number;

  @Column()
    description: string;

  @Column()
    details: string;

  @Column()
    user_id: number;

  @ManyToOne('User', (user: User) => user.message)
  @JoinColumn({ name: "user_id", referencedColumnName: "uid" })
  user!: User;

  constructor( description: string, details: string, user_id: number ) {
    super();
    this.description = description;
    this.details = details;
    this.user_id = user_id;
  }
}
