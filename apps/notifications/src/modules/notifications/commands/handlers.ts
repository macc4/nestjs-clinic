import { CreateAppointmentNotificationHandler } from './create-appointment/create-appointment.handler';
import { CreateResolutionNotificationHandler } from './create-resolution/create-resolution.handler';
import { ReadNotificationHandler } from './read-notification/read-notification.handler';

export const CommandHandlers = [
  CreateAppointmentNotificationHandler,
  CreateResolutionNotificationHandler,
  ReadNotificationHandler,
];
