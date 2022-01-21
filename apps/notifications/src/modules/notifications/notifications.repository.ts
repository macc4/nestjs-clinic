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

    const notification: Notification = this.create({
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
    WHERE notifications.user_id = '${userId}'
    `;
    const notifications: Notification[] = (await this.pool.query(query)).map(
      (notification: Notification) => snakeToCamel(notification),
    );

    return notifications;
  }

  async getMyUnreadNotificationsCount(userId: string): Promise<number> {
    const query = `SELECT COUNT(*)
    FROM notifications.notifications
    WHERE notifications.user_id = '${userId}'
    AND is_read = 'false'
    `;

    const [count] = await this.pool.query(query);

    return count;
  }

  async readNotifications(ids: string[]): Promise<Notification[]> {
    const notificationIds = ids.length > 1 ? ids.join(',') : ids;

    const query = `
    UPDATE notifications.notifications
      SET is_read = 'true'
    WHERE notifications.id IN (${notificationIds})
    `;

    const notification: Notification[] = await this.pool.query(query);

    return snakeToCamel(notification);
  }
}
