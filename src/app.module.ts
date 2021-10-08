import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { AuthModule } from './modules/auth/auth.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';

@Module({
  imports: [SharedModule, AuthModule, PatientsModule, ResolutionsModule],
})
export class AppModule {}
