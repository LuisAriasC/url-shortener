import { Module } from '@nestjs/common';
import { AuthWebAppService } from './auth-web-app.service';
import { AuthWebAppController } from './auth-web-app.controller';
import { UserWebAppModule } from '../user/user-web-app.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserWebAppModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret', // Usa env segura
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthWebAppController],
  providers: [AuthWebAppService, JwtStrategy],
})
export class AuthWebAppModule {}