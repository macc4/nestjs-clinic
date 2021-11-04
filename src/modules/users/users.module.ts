import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from '../patients/patients.module';
import { RolesRepository } from './roles.repository';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [
    PatientsModule,
    TypeOrmModule.forFeature([UsersRepository, RolesRepository]),
  ],
  providers: [UsersService, RolesService],
  exports: [UsersService],
})
export class UsersModule {}
