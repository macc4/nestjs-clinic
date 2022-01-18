import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsGateway } from '../../notifications.gateway';
import { NotificationsRepository } from '../../notifications.repository';
import { CreateAppointmentNotificationCommand } from './create-appointment.command';

@CommandHandler(CreateAppointmentNotificationCommand)
export class CreateAppointmentNotificationHandler
  implements ICommandHandler<CreateAppointmentNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async execute(command: CreateAppointmentNotificationCommand): Promise<void> {
    const { recepientUserId, ...data } = command;

    const notification = await this.repository.addNotification(
      recepientUserId,
      {
        ...data,
      },
    );

    this.notificationsGateway.handleNewNotification(notification);
  }
}
