import { snakeToCamel } from '@macc4-clinic/common';
import {
  Repository,
  EntityRepository,
  EntityManager,
  getManager,
} from 'typeorm';
import { Notification } from './entities/notification.entity';

@EntityRepository(Notification)
export class NotificationsRepository extends Repository<Notification> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }

  async addNotification(
    userId: string,
    payload: Record<string, any>,
  ): Promise<Notification> {
    const { type, ...otherData } = payload;

    const notification = this.create({
      userId,
      type,
      payload: otherData,
    });

    await this.save(notification);

    return notification;
  }

  async getNotifications(userId: string): Promise<Notification[]> {
    const query = `SELECT *
    FROM notifications.notifications
    WHERE notifications.user_id = '${userId}'`;

    const notifications = (await this.pool.query(query)).map((notification) =>
      snakeToCamel(notification),
    );

    return notifications;
  }

  async readNotification(id: string): Promise<Notification> {
    const query = `
    UPDATE notifications.notifications
      SET read = 'true'
    WHERE notifications.id = ${id}
    `;

    const notification = await this.pool.query(query);

    return snakeToCamel(notification);
  }
}
