import { Module } from '@nestjs/common';
import { SharedModule } from './modules/shared/shared.module';
import { PatientsModule } from './modules/patients/patients.module';
import { ResolutionsModule } from './modules/resolutions/resolutions.module';

@Module({
  imports: [SharedModule, PatientsModule, ResolutionsModule],
})
export class AppModule {}
