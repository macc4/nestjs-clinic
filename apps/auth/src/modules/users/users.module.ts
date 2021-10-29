import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { HttpWrapperModule } from '../http/http.module';

@Module({
  imports: [
    HttpWrapperModule,
    TypeOrmModule.forFeature([UsersRepository, RolesRepository]),
  ],
  providers: [UsersService, RolesService],
  exports: [UsersService, RolesService],
})
export class UsersModule {}
