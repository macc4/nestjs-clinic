import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { CreateResolutionNotificationCommand } from './create-resolution.command';

@CommandHandler(CreateResolutionNotificationCommand)
export class CreateResolutionNotificationHandler
  implements ICommandHandler<CreateResolutionNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(command: CreateResolutionNotificationCommand) {
    const { recepientUserId, ...data } = command;

    this.repository.addNotification(recepientUserId, {
      ...data,
    });
  }
}
