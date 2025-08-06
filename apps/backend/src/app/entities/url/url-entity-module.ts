import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from './url-entity';
import { UrlEntityService } from './url-entity.service';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  providers: [UrlEntityService],
  exports: [UrlEntityService],
})
export class UrlEntityModule {}