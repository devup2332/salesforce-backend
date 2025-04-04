import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { env } from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: env.FRONT_URL,
      credentials: true,
    },
  });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
