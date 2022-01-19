import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtPayloadDto } from '@macc4-clinic/common';
import { WebsocketService } from '../websocket/websocket.service';
import { CommandBus } from '@nestjs/cqrs';
import { ReadNotificationCommand } from './commands/read-notification/read-notification.command';

@WebSocketGateway({ cors: true })
export class NotificationsGateway {
  constructor(
    private readonly websocketService: WebsocketService,
    private readonly commandBus: CommandBus,
  ) {}

  async handleConnection(client: Socket): Promise<void> {
    const user: JwtPayloadDto =
      this.websocketService.verifyJwtAndGetPayload(client);

    await this.websocketService.joinRoom(client, user.id);
  }

  @SubscribeMessage('read_notification')
  handleReadNotification(@MessageBody() id: string): void {
    this.commandBus.execute(new ReadNotificationCommand(id));
  }
}
