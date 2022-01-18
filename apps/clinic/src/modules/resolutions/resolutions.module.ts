import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from '../appointments/appointments.module';
import { DoctorsModule } from '../doctors/doctors.module';
import { GRPCModule } from '../grpc/grpc.module';
import { KafkaModule } from '../kafka/kafka.module';
import { PatientsModule } from '../patients/patients.module';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';

@Module({
  imports: [
    GRPCModule,
    KafkaModule,
    TypeOrmModule.forFeature([ResolutionsRepository]),
    PatientsModule,
    DoctorsModule,
    AppointmentsModule,
  ],
  controllers: [ResolutionsController],
  providers: [ResolutionsService],
})
export class ResolutionsModule {}
