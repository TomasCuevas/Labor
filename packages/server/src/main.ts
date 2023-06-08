import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

//* principal module *//
import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

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
