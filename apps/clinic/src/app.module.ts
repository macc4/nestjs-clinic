import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { QueueModule } from './modules/queue/queue.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';
import { RouterModule } from '@nestjs/core';
import { routes } from './nested-routes';
import { DoctorsAppointmentsModule } from './modules/appointments/doctors-appointments.module';
import { GRPCModule } from './modules/grpc/grpc.module';

@Module({
  imports: [
    RouterModule.register(routes),
    SharedModule,
    GRPCModule,
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
    DoctorsAppointmentsModule,
    ResolutionsModule,
    QueueModule,
  ],
})
export class AppModule {}
