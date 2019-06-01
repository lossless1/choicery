import { Entity, Column, BeforeInsert, ObjectIdColumn } from "typeorm";
import { IsDate, IsEmail} from 'class-validator';
import * as crypto from 'crypto';

@Entity('user')
export class UserEntity {

  @ObjectIdColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  @IsEmail()
  email: string;

  @Column({default: ''})
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
  createdAt: string;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
  updatedAt: string;
}
