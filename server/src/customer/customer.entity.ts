import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ReferencePerson } from './model/reference.person';
import { CompanyEntity } from '../company/company.entity';

@Entity()
export class CustomerEntity {

    @ObjectIdColumn()
    id: string;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    position: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @Column()
    description: string;

    @Column(type => CompanyEntity)
    company: CompanyEntity;

    @Column(type => ReferencePerson)
    referencePerson: ReferencePerson;

    @Column()
    contactDetails: string;

    @Column()
    order: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: string;
}
