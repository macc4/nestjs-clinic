import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { NotificationsController } from './notifications.controller';
import { NotificationsRepository } from './notifications.repository';
import { CommandHandlers } from './commands/handlers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsGateway } from './notifications.gateway';
import { QueryHandlers } from './queries/handlers';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([NotificationsRepository]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsGateway, ...CommandHandlers, ...QueryHandlers],
})
export class NotificationsModule {}
