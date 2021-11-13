import { Metadata } from '@grpc/grpc-js';
import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientsGRPCService } from './interfaces/clinic.service.interface';

@Controller('clinic')
export class ClinicService implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    @Inject('CLINIC_PACKAGE') private readonly client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.patientsService = this.client.getService<PatientsGRPCService>(
      'PatientsGRPCService',
    );
  }

  private patientsService: PatientsGRPCService;

  async createPatient(createPatientDto: CreatePatientDto): Promise<any> {
    const metadata = new Metadata();

    metadata.set('token', this.configService.get('JWT_SECRET'));

    const patient = await lastValueFrom(
      this.patientsService.createPatient(createPatientDto, metadata),
    );

    return patient;
  }
}
