// apps/backend/src/app/web-app/user/user-web-app.module.ts
import { Module } from '@nestjs/common';
import { UserWebAppService } from './user-web-app.service';
import { UserEntityModule } from '../../entities/user/user-entity-module';

@Module({
  imports: [UserEntityModule],
  providers: [UserWebAppService],
  exports: [UserWebAppService],
})
export class UserWebAppModule {}