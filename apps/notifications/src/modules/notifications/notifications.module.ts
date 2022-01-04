import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { CommandHandlers } from './commands/handlers';
import { GetNotificationsHandler } from './queries/get-notifications.handler';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([NotificationsRepository])],
  controllers: [NotificationsController],
  providers: [...CommandHandlers, GetNotificationsHandler],
})
export class NotificationsModule {}
