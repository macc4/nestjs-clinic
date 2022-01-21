import { GetNotificationsHandler } from './get-notifications/get-notifications.handler';
import { GetUnreadNotificationsCountHandler } from './get-unread-notifications-count/get-unread-notifications-count.handler';

export const QueryHandlers = [
  GetNotificationsHandler,
  GetUnreadNotificationsCountHandler,
];
