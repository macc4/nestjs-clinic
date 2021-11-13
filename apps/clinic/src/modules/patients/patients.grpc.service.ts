import { GrpcMethod } from '@nestjs/microservices';
import { Controller, UseGuards } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { GRPCGuard } from '@macc4-clinic/common';

@Controller('patients')
@UseGuards(GRPCGuard)
export class PatientsGRPCService {
  constructor(private readonly patientsService: PatientsService) {}

  @GrpcMethod('PatientsGRPCService', 'createPatient')
  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    return await this.patientsService.createPatient(createPatientDto);
  }
}
