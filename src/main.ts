import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Clinic API')
    .setDescription(
      'Clinic API build with the NestJS framework for the ITRex Internship',
    )
    .setVersion('0.0.1')
    .addTag('resolutions')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(8080);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
