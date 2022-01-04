import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NotificationsService } from './kafka-notifications.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'clinic',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'clinic-consumer',
          },
        },
      },
    ]),
  ],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class KafkaModule {}
