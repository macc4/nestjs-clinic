import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from '../../config/config.schema';
import { JwtStrategy } from '@macc4-clinic/common';
import { Logger } from './logger.service';
import { BucketStorageModule } from './bucket-storage/bucket-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
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
        region: 'eu-north-1',
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        bucket: 'itrex-clinic-aleksei/avatars',
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
