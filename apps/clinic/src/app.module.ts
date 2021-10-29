import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { QueueModule } from './modules/queue/queue.module';
import { DoctorsModule } from './modules/doctors/doctors.module';

@Module({
  imports: [
    SharedModule,
    PatientsModule,
    ResolutionsModule,
    QueueModule,
    DoctorsModule,
  ],
})
export class AppModule {}
