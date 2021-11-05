import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { QueueModule } from './modules/queue/queue.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { AppointmentsModule } from './modules/appointments/appointments.module';

@Module({
  imports: [
    SharedModule,
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
    ResolutionsModule,
    QueueModule,
  ],
})
export class AppModule {}
