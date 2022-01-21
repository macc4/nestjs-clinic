import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { WsEvent } from './event.interface';
import { WsEventNames } from './constants';
import { Notification } from '../entities/notification.entity';

@WebSocketGateway()
export class NewNotificationEvent implements WsEvent<Notification> {
  type = WsEventNames.NewNotification;

  @WebSocketServer()
  server: Server;

  emit(notification: Notification): void {
    this.server.in(notification.userId).emit(this.type, notification);
  }
}
