import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { NewNotificationEvent } from '../../websocket/new-notification.event';
import { CreateResolutionNotificationCommand } from './create-resolution.command';

@CommandHandler(CreateResolutionNotificationCommand)
export class CreateResolutionNotificationHandler
  implements ICommandHandler<CreateResolutionNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly newNotificationEvent: NewNotificationEvent,
  ) {}

  async execute(command: CreateResolutionNotificationCommand): Promise<void> {
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
