import { Module } from '@nestjs/common';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SharedModule } from './modules/shared/shared.module';

@Module({
  imports: [SharedModule, NotificationsModule],
})
export class AppModule {}
