import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresModule } from '@url-shortener/types';
import { WebAppModule } from './web-app/web-app.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    }
  ],
})
export class AppModule {}
