import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientsModule } from '../patients/patients.module';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResolutionsRepository]), PatientsModule],
  controllers: [ResolutionsController],
  providers: [ResolutionsService],
})
export class ResolutionsModule {}
