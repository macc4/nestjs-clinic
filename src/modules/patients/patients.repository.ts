import { EntityRepository, Repository } from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './patient.entity';

@EntityRepository(Patient)
export class PatientsRepository extends Repository<Patient> {
  //
  // Create a new patient
  //

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { name, gender } = createPatientDto;

    const patient = this.create({
      name,
      gender,
    });

    await this.save(patient);

    return patient;
  }

  //
  // Get patient by ID
  //

  async getPatientById(id: number): Promise<Patient> {
    const patient = await this.findOne(id);

    return patient;
  }
}
