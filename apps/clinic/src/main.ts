import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('ClinicService');

  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  // Swagger

  const options = new DocumentBuilder()
    .setTitle('Clinic-Service')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  //

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const urlGRPC = `${configService.get(
    'CLINIC_SERVICE_GRPC_HOST',
  )}:${configService.get('CLINIC_SERVICE_GRPC_PORT')}`;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'clinic',
      protoPath: join(__dirname, '../grpc/clinic.proto'),
      url: urlGRPC,
      loader: { keepCase: true },
    },
  });

  app.startAllMicroservices();

  const port = configService.get('PORT');
  await app.listen(port);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
