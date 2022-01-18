import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy, loadConfig } from '@macc4-clinic/common';
import { configGlobalValidationSchema } from '../../config/schemas/config.global.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        async () =>
          loadConfig({
            localValidationSchema: configGlobalValidationSchema,
          }),
      ],
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
  ],
})
export class SharedModule {}
