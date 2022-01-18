import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DoctorsModule,
    PatientsModule,
    RedisModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        closeClient: true,
        config: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
