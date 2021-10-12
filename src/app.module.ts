import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { UsersModule } from './modules/users/users.module';
import { QueueModule } from './modules/queue/queue.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    ResolutionsModule,
    QueueModule,
  ],
})
export class AppModule {}
