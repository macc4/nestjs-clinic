import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { IAppointmentCreated } from './interfaces/IAppointmentCreated';
import { IResolutionCreated } from './interfaces/IResolutionCreated';

@Injectable()
export class NotificationsService implements OnModuleInit, OnModuleDestroy {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.close();
  }

  sendAppointmentCreatedNotification(appointment: IAppointmentCreated): void {
    this.client.emit('notification.create.appointment', appointment);
  }

  sendResolutionCreatedNotification(resolution: IResolutionCreated): void {
    this.client.emit('notification.create.resolution', resolution);
  }
}
