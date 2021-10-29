import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([UsersRepository, RolesRepository]),
  ],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
