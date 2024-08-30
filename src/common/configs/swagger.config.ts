import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication): void => {
  const documentBuilder = new DocumentBuilder()
    .setTitle('AI Backend API')
    .setDescription('The API description')
    .setVersion('1.0')
    .setExternalDoc('Postman Collection', '/documentation-json')
    .addBearerAuth();
  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('documentation', app, document);
};
