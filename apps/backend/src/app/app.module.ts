import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from '@url-shortener/types';
import { WebAppModule } from './web-app/web-app.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './web-app/auth/jwt.guard';

@Module({
  imports: [
    PostgresModule,
    WebAppModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'default',
          limit: 60,
          ttl: 60,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useFactory: (reflector: Reflector) => new JwtAuthGuard(reflector),
      inject: [Reflector],
    }
  ],
})
export class AppModule {}
