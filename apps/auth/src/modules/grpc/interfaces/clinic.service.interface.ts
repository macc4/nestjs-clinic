import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { CreatePatientDto } from '../dto/create-patient.dto';

export interface PatientsGRPCService {
  createPatient(
    data: CreatePatientDto,
    metadata: Metadata,
  ): Observable<Patient>;
}

export interface Patient {
  id: number;
  userId: string;
}
