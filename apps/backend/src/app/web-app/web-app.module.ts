import { Module } from '@nestjs/common';
import { UrlWebAppModule } from './url/url-web-app.module';
import { UserWebAppModule } from './user/user-web-app.module';
import { AuthWebAppModule } from './auth/auth-web-app.module';

@Module({
  imports: [UrlWebAppModule, UserWebAppModule, AuthWebAppModule],
})
export class WebAppModule {}