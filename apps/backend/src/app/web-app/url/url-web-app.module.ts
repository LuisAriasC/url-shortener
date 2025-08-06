import { Module } from '@nestjs/common';
import { UrlWebAppService } from './url-web-app.service';
import { UrlWebAppController } from './url-web-app.controller';
import { UrlEntityModule } from '../../entities/url/url-entity-module';

@Module({
  imports: [UrlEntityModule],
  controllers: [UrlWebAppController],
  providers: [UrlWebAppService],
})
export class UrlWebAppModule {}