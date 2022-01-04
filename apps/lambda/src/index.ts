import { APIGatewayProxyHandler } from 'aws-lambda';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';
import { AppService } from './app.service';

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter);

  const testService = app.get(AppService);

  app.enableCors();

  await app.init();

  await testService.getParametersFromSsmAndLog();

  return awsServerlessExpress.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }

  return awsServerlessExpress.proxy(cachedServer, event, context, 'PROMISE')
    .promise;
};
