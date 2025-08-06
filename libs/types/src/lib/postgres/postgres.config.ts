import { registerAs } from '@nestjs/config';

export default registerAs('postgres', () => {
  const nodeEnv = process.env['NODE_ENV'] || 'development';
  const isProduction = nodeEnv === 'production';

  return {
    host: process.env['DB_HOST'],
    port: parseInt(process.env['DB_PORT'] || '5432'),
    user: process.env['DB_USER'],
    password: process.env['DB_PASSWORD'],
    db: process.env['DB_NAME'],
    logging: process.env['DB_LOGGING'] === 'true',
    synchronize: !isProduction,
    ssl: isProduction, // Habilita ssl condicional
  };
});