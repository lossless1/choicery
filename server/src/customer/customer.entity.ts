import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ObjectIdColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { ReferencePerson } from './model/reference.person';
import { Company } from '../../../client/src/app/core/models';

@Entity()
export class Customer {

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

    @Column(type => Company)
    company: Company;

    @Column(type => ReferencePerson)
    referencePerson: ReferencePerson;

    @Column()
    contactDetails: string;

    @Column()
    order: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    createdAt: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    updatedAt: string;
}
