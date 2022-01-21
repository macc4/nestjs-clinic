import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { NotificationsRepository } from '../../notifications.repository';
import { GetUnreadNotificationsCountQuery } from './get-unread-notifications-count.query';

@QueryHandler(GetUnreadNotificationsCountQuery)
export class GetUnreadNotificationsCountHandler
  implements IQueryHandler<GetUnreadNotificationsCountQuery>
{
  constructor(
    @InjectRepository(NotificationsRepository)
    private readonly repository: NotificationsRepository,
  ) {}

  async execute(command: GetUnreadNotificationsCountQuery): Promise<number> {
    const { userId } = command;

    return this.repository.getMyUnreadNotificationsCount(userId);
  }
}
