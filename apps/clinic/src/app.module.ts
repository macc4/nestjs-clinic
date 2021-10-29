import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { QueueModule } from './modules/queue/queue.module';
import { DoctorsModule } from './modules/doctors/doctors.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    SharedModule,
    PatientsModule,
    ResolutionsModule,
    QueueModule,
    DoctorsModule,
  ],
})
export class AppModule {}
