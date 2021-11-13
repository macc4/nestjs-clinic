import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsRepository } from './patients.repository';
import { PatientsGRPCService } from './patients.grpc.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([PatientsRepository])],
  controllers: [PatientsController, PatientsGRPCService],
  providers: [PatientsService],
  exports: [PatientsService],
})
export class PatientsModule {}
