import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';
import { swaggerConfig } from './common/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.setGlobalPrefix('api');
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  swaggerConfig(app);
  app.enableShutdownHooks();
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
  const logger = app.get(Logger);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
