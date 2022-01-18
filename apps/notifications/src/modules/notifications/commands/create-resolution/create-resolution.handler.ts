import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsGateway } from '../../notifications.gateway';
import { NotificationsRepository } from '../../notifications.repository';
import { CreateResolutionNotificationCommand } from './create-resolution.command';

@CommandHandler(CreateResolutionNotificationCommand)
export class CreateResolutionNotificationHandler
  implements ICommandHandler<CreateResolutionNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
    private readonly notificationsGateway: NotificationsGateway,
  ) {}

  async execute(command: CreateResolutionNotificationCommand): Promise<void> {
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
