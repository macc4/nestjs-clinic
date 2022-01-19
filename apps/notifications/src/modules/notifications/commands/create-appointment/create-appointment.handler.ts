import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { NewNotificationEvent } from '../../websocket/new-notification.event';
import { CreateAppointmentNotificationCommand } from './create-appointment.command';

@CommandHandler(CreateAppointmentNotificationCommand)
export class CreateAppointmentNotificationHandler
  implements ICommandHandler<CreateAppointmentNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly newNotificationEvent: NewNotificationEvent,
  ) {}

  async execute(command: CreateAppointmentNotificationCommand): Promise<void> {
    const { recepientUserId, ...data } = command;

    const notification = await this.repository.addNotification(
      recepientUserId,
      {
        ...data,
      },
    );

    this.newNotificationEvent.emit(notification);
  }
}
