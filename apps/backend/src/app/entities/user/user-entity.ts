// apps/backend/src/app/entities/user/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { UrlEntity } from '../url/url-entity';
import { User } from '@url-shortener/types';

@Entity()
export class UserEntity implements User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // ¡hashéala después!

  @OneToMany(() => UrlEntity, (url) => url.createdBy)
  urls: UrlEntity[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}