import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ArticleEntity } from './article.entity';

@Entity()
export class Comment {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  slug: string;

  @Column();
  name: string;

  @Column();
  host: string;

  @Column();
  description: string;
  
  @Column();
  avatarUrl: string;

  @Column();  
  createdAt?: Date;

  @Column();
  updatedAt?: Date;
}