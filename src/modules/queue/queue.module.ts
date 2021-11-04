import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueService } from './queue.service';
import { AuthModule } from '../auth/auth.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { DoctorsModule } from '../doctors/doctors.module';

@Module({
  imports: [
    AuthModule,
    DoctorsModule,
    RedisModule.forRoot({
      closeClient: true,
      config: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
      },
    }),
  ],
  controllers: [QueueController],
  providers: [QueueService],
})
export class QueueModule {}
