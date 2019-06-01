import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ObjectIdColumn } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
export class Comment {
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
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    createdAt: string;
    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP")
    updatedAt: string;
}
