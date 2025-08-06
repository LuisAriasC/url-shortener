import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';
import { Url } from '@url-shortener/types';

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

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}

