import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '../doctors/doctors.module';
import { GRPCModule } from '../grpc/grpc.module';
import { PatientsModule } from '../patients/patients.module';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsRepository } from './appointments.repository';
import { AppointmentsService } from './appointments.service';

@Module({
  imports: [
    GRPCModule,
    TypeOrmModule.forFeature([AppointmentsRepository]),
    PatientsModule,
    DoctorsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
