import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GRPCModule } from './modules/grpc/grpc.module';
import { DatabaseModule } from './modules/database/database.module';

@Module({
  imports: [SharedModule, DatabaseModule, GRPCModule, AuthModule, UsersModule],
})
export class AppModule {}
