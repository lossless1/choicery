import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';

@Entity('requests')
export class RequestEntity {
    @ObjectIdColumn()
    id: string;

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

    @Column(type => CustomerEntity)
    customer: CustomerEntity;

    @Column()
    requestState: string;


    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt?: string;
}
