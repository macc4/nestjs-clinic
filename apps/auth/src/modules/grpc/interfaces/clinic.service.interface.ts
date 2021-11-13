import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import { CreatePatientDto } from '../dto/create-patient.dto';

export interface PatientsGRPCService {
  createPatient(
    data: CreatePatientDto,
    metadata: Metadata,
  ): Observable<Patient>;
}

interface Patient {
  id: number;
  user_id: string;
}
