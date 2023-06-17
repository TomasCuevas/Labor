import * as dotenv from 'dotenv';
dotenv.config();

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//* principal module *//
import { AppModule } from './app.module';

//* origines permitidos por cors
const origins = process.env.ORIGINS.split(' ');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors({
    origin: origins,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

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
