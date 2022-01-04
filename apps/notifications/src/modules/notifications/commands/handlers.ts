import { CreateAppointmentNotificationHandler } from './create-appointment/create-appointment.handler';
import { CreateResolutionNotificationHandler } from './create-resolution/create-resolution.handler';

export const CommandHandlers = [
  CreateAppointmentNotificationHandler,
  CreateResolutionNotificationHandler,
];
