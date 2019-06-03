import { Entity, Column, BeforeInsert, ObjectIdColumn, ObjectID } from "typeorm";
import { IsEmail} from 'class-validator';
import * as crypto from 'crypto';

@Entity('users')
export class UserEntity {

  @ObjectIdColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  username: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  image: string;

  @Column()
  password: string;

  @Column()
  companyId: string;

  @Column()
  position: string;

  @Column()
  description: string;

  @BeforeInsert()
  hashPassword() {
    this.password = crypto.createHmac('sha256', this.password).digest('hex');
  }

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  createdAt: string;

  @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  updatedAt: string;
}
