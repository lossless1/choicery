import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class CompanyEntity {
    @ObjectIdColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    host: string;
    @Column()
    image: string;
    @Column()
    portalUrl: string;
    @Column()
    info: string;
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt: string;
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    updatedAt: string;
}
