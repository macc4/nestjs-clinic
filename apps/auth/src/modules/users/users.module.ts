import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { GRPCModule } from '../grpc/grpc.module';

@Module({
  imports: [
    GRPCModule,
    TypeOrmModule.forFeature([UsersRepository, RolesRepository]),
  ],
  providers: [UsersService, RolesService],
  exports: [UsersService, RolesService],
})
export class UsersModule {}
