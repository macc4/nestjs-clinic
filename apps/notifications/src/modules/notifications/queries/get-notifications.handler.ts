import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../notifications.repository';
import { GetNotificationsQuery } from './get-notifications.query';

@QueryHandler(GetNotificationsQuery)
export class GetNotificationsHandler
  implements IQueryHandler<GetNotificationsQuery>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(command: GetNotificationsQuery) {
    const { userId } = command;

    return this.repository.getNotifications(userId);
  }
}
