import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import postgresConfig from './postgres.config';

const MyTypeOrmModule = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => {
    const synchronize = configService.get<boolean>('postgres.synchronize', { infer: true });
    const logging = configService.get<boolean>('postgres.logging', { infer: true });
    const sslEnabled = configService.get<boolean>('postgres.ssl', { infer: true });

    return {
      type: 'postgres',
      host: configService.get<string>('postgres.host'),
      port: configService.get<number>('postgres.port', { infer: true }),
      username: configService.get<string>('postgres.user'),
      password: configService.get<string>('postgres.password'),
      database: configService.get<string>('postgres.db'),
      synchronize,
      logging,
      autoLoadEntities: true,
      ...(sslEnabled && {
        ssl: { rejectUnauthorized: false },
      }),
    };
  },
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [postgresConfig],
    }),
    MyTypeOrmModule,
  ],
  exports: [MyTypeOrmModule],
})
export class PostgresModule {}