import { registerAs } from '@nestjs/config';

export default registerAs('app', async () => {
  try {
    const environment = process.env.NODE_ENV;
    return {
      environment,
    };
  } catch (err) {
    console.log(err);
    return;
  }
});
