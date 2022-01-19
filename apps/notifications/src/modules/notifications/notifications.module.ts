import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsGateway } from './notifications.gateway';
import { QueryHandlers } from './queries/handlers';
import { WsEvents } from './ws-events/websocket-events';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    CqrsModule,
    WebsocketModule,
    TypeOrmModule.forFeature([NotificationsRepository]),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsGateway,
    ...CommandHandlers,
    ...QueryHandlers,
    ...WsEvents,
  ],
})
export class NotificationsModule {}
