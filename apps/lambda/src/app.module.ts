import { Module } from '@nestjs/common';
import { loadConfig } from '@macc4-clinic/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLocalValidationSchema } from './config/schemas/config.local.schema';
import { configGlobalValidationSchema } from './config/schemas/config.global.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        async () =>
          loadConfig({
            overrideValuesWithSsm: true,
            localValidationSchema: configLocalValidationSchema,
            globalValidationSchema: configGlobalValidationSchema,
            ssm: {
              paths: ['/itrex/clinic/lambda/'],
              regionReference: 'ssm.region',
            },
          }),
      ],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
