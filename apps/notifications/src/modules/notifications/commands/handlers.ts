import { CreateAppointmentNotificationHandler } from './create-appointment/create-appointment.handler';
import { CreateResolutionNotificationHandler } from './create-resolution/create-resolution.handler';
import { ReadNotificationsHandler } from './read-notification/read-notifications.handler';

export const CommandHandlers = [
  CreateAppointmentNotificationHandler,
  CreateResolutionNotificationHandler,
  ReadNotificationsHandler,
];
