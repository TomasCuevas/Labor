import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

//* principal module *//
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('/api');

  await app.listen(process.env.PORT);
}

bootstrap();
