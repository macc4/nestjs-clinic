import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';
import { UsersModule } from './modules/auth/users/users.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    UsersModule,
    PatientsModule,
    ResolutionsModule,
  ],
})
export class AppModule {}
