import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@macc4-clinic/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { join } from 'path';
import { Logger } from './modules/shared/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get(Logger);
  app.useLogger(logger);

  const configService = app.get(ConfigService);

  // Swagger

  const options = new DocumentBuilder()
    .setTitle('Profile-Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  //

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const urlGRPC = `${configService.get(
    'PROFILE_SERVICE_GRPC_HOST',
  )}:${configService.get('PROFILE_SERVICE_GRPC_PORT')}`;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'profile',
      protoPath: join(__dirname, '../grpc/profile.proto'),
      url: urlGRPC,
      loader: { keepCase: true },
    },
  });

  await app.startAllMicroservices();

  const port = configService.get('PORT');

  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
