import { CommandBus } from '@nestjs/cqrs';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtPayloadDto } from '@macc4-clinic/common';
import { WebsocketService } from '../websocket/websocket.service';
import { WsEventNames } from './websocket/constants';
import { ReadNotificationsCommand } from './commands/read-notification/read-notifications.command';

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

  @SubscribeMessage(WsEventNames.ReadNotifications) // maybe it should be an HTTP request too
  async handleReadNotifications(@MessageBody() ids: string[]): Promise<void> {
    await this.commandBus.execute(new ReadNotificationsCommand(ids));
  }
}
