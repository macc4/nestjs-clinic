import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientsModule } from '../patients/patients.module';
import { DoctorsAppointmentsController } from './doctors-appointments.controller';
import { DoctorsAppointmentsRepository } from './doctors-appointments.repository';
import { DoctorsAppointmentsService } from './doctors-appointments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorsAppointmentsRepository]),
    PatientsModule,
    DoctorsModule,
  ],
  controllers: [DoctorsAppointmentsController],
  providers: [DoctorsAppointmentsService],
})
export class DoctorsAppointmentsModule {}
