import { Entity, Column, ObjectIdColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { CustomerEntity } from '../customer/customer.entity';
import { CompanyEntity } from '../company/company.entity';
import { Type } from 'class-transformer';

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

    @Column(type => CompanyEntity)
    referenceCompany: CompanyEntity;

    @Column()
    email: string;

    @Column()
    status: string;

    @Column(type => CustomerEntity)
    customer: CustomerEntity;

    @Column()
    requestState: string;

    @Type(() => Date)
    createdAt: number;

    @Type(() => Date)
    updatedAt: number;

    @BeforeInsert()
    updateDateCreation() {
        this.createdAt = Date.now();
    }

    @BeforeUpdate()
    updateDateUpdate() {
        this.updatedAt = Date.now();
    }
}
