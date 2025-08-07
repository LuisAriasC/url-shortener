import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Url } from '@url-shortener/types';
import { UserEntity } from '../user/user-entity';

@Entity('urls')
export class UrlEntity implements Url {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'original_url', type: 'text' })
  originalUrl: string;

  @Column({ name: 'short_id', type: 'text', unique: true })
  shortId: string;

  @Column({ name: 'visit_count', type: 'int' })
  visitCount: number;

  @ManyToOne(() => UserEntity, (user) => user.urls, { eager: true, onDelete: 'CASCADE' })
  createdBy: UserEntity;
  
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

}

