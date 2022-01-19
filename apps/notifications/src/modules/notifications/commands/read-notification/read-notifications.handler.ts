import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { ReadNotificationsCommand } from './read-notifications.command';

@CommandHandler(ReadNotificationsCommand)
export class ReadNotificationsHandler
  implements ICommandHandler<ReadNotificationsCommand>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(command: ReadNotificationsCommand): Promise<void> {
    const { ids } = command;

    await this.repository.readNotifications(ids);
  }
}
