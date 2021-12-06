import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from '@macc4-clinic/common';
import { Logger } from './logger.service';
import { BucketStorageModule } from './bucket-storage/bucket-storage.module';
import { ConfigModule, ConfigService } from '@macc4-clinic/common';
import { configLocalValidationSchema } from 'src/config/schemas/config.local.schema';
import { configGlobalValidationSchema } from 'src/config/schemas/config.global.schema';

@Module({
  imports: [
    ConfigModule.register({
      isGlobal: true,
      overrideValuesWithEnv: true,
      globalValidationSchema: configGlobalValidationSchema,
      yamlValidationSchema: configLocalValidationSchema,
      ssm: {
        paths: ['/itrex/clinic/profile/dev/'],
        regionReference: 'ssm.region',
        accessKeyIdReference: 'ssm.accessKeyId',
        secretAccessKeyReference: 'ssm.secretAccessKey',
      },
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        logging: true,
        synchronize: false,
        migrationsRun: true,
        entities: [__dirname + './../**/entities/*.{js,ts}'],
        migrations: [__dirname + './../../../migrations/*.{js,ts}'],
      }),
      inject: [ConfigService],
    }),
    BucketStorageModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        region: configService.get('s3.region'),
        accessKeyId: configService.get('s3.accessKeyId'),
        secretAccessKey: configService.get('s3.secretAccessKey'),
        bucket: configService.get('s3.bucket'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: 'AUTH_STRATEGY',
      useFactory: (configService: ConfigService) => {
        const secret = configService.get('JWT_SECRET');
        return new JwtStrategy({ secret });
      },
      inject: [ConfigService],
    },
    Logger,
  ],
  exports: [Logger],
})
export class SharedModule {}
