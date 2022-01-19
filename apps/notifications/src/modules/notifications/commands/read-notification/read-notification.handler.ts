import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { ReadNotificationCommand } from './read-notification.command';

@CommandHandler(ReadNotificationCommand)
export class ReadNotificationHandler
  implements ICommandHandler<ReadNotificationCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(command: ReadNotificationCommand): Promise<void> {
    const { id } = command;

    await this.repository.readNotification(id);
  }
}
