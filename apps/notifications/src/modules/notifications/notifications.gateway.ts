import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { JwtPayloadDto } from '@macc4-clinic/common';
import { WebsocketService } from '../websocket/websocket.service';
import { CommandBus } from '@nestjs/cqrs';
import { ReadNotificationsCommand } from './commands/read-notification/read-notifications.command';
import { WsEventNames } from './websocket/constants';

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

  @SubscribeMessage(WsEventNames.ReadNotifications)
  handleReadNotifications(@MessageBody() ids: string[]): void {
    this.commandBus.execute(new ReadNotificationsCommand(ids));
  }
}
