import {
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { JwtService } from '@nestjs/jwt';
import { Server, Socket } from 'socket.io';
import { JwtPayloadDto } from '@macc4-clinic/common';
import { Notification } from './entities/notification.entity';
import { QueryBus } from '@nestjs/cqrs';

@WebSocketGateway()
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly queryBus: QueryBus,
  ) {}

  verifyUserAndGetId(client: Socket): string {
    let user: JwtPayloadDto;

    try {
      const bearerToken: string =
        client.handshake.headers.authorization.split(' ')[1];

      user = this.jwtService.verify(bearerToken);
    } catch (error) {
      throw new WsException('Unauthorized.');
    }

    return user.id;
  }

  async handleConnection(client: Socket): Promise<void> {
    const userId = this.verifyUserAndGetId(client);

    console.log('New user has connected. User ID:');
    console.log(userId);

    await client.join(userId);
  }

  handleNewNotification(notification: Notification): void {
    this.server.in(notification.userId).emit('new_notification', notification);
  }
}