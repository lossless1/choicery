import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { Customer } from '../customer/customer.entity';

@Entity('requests')
export class Comment {
    @ObjectIdColumn()
    id: number;

    @Column()
    fullName: string;
    @Column()

    companyName: string;
    @Column()

    companyDetails: string;
    @Column()

    email: string;

    @Column()
    status: string;

    @Column(type => Customer)
    customer: Customer;

    @Column()
    requestState: string;


    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    createdAt: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    updatedAt?: string;
}
