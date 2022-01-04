import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { CreateAppointmentNotificationCommand } from './create-appointment.command';

@CommandHandler(CreateAppointmentNotificationCommand)
export class CreateAppointmentNotificationHandler
  implements ICommandHandler<CreateAppointmentNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(command: CreateAppointmentNotificationCommand) {
    const { recepientUserId, ...data } = command;

    this.repository.addNotification(recepientUserId, {
      ...data,
    });
  }
}
