import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//* principal module *//
import { AppModule } from './app.module';

//* origines permitidos por cors
const origins = process.env.ORIGINS.split(' ');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: origins,
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
