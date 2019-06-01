import { Column } from 'typeorm';

export class ReferencePerson{
    @Column()
    image: string;

    @Column()
    name: string;

    @Column()
    phone: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    createdAt: string;
}
