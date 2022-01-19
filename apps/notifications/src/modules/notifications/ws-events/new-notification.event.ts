import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '../entities/notification.entity';

@WebSocketGateway()
export class NewNotificationEvent {
  private readonly type = 'new_notification';

  @WebSocketServer()
  server: Server;

  emit(notification: Notification): void {
    this.server.in(notification.userId).emit(this.type, notification);
  }
}
