import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsRepository } from './doctors.repository';
import { SpecializationsService } from './specializations.service';
import { SpecializationsRepository } from './specializations.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorsRepository, SpecializationsRepository]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService, SpecializationsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
