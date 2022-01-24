import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebsocketModule } from '../websocket/websocket.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { NotificationsGateway } from './notifications.gateway';
import { CommandHandlers } from './commands';
import { QueryHandlers } from './queries';
import { WsEvents } from './websocket';

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
