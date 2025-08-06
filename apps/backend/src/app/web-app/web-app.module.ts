import { Module } from '@nestjs/common';
import { UrlWebAppModule } from './url/url-web-app.module';

@Module({
  imports: [UrlWebAppModule],
})
export class WebAppModule {}