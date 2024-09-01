import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { swaggerConfig } from './common/configs/swagger.config';
import { SharedService } from './shared/shared.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(cookieParser());
  swaggerConfig(app);
  app.enableShutdownHooks();
  await app.listen(app.get(SharedService).port);
  const logger = app.get(Logger);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
