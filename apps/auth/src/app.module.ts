import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { GRPCModule } from './modules/grpc/grpc.module';

@Module({
  imports: [SharedModule, GRPCModule, AuthModule, UsersModule],
})
export class AppModule {}
