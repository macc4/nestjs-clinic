import { EntityRepository, Repository } from 'typeorm';
import { User } from '../auth/user.entity';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './patient.entity';

@EntityRepository(Patient)
export class PatientsRepository extends Repository<Patient> {
  //
  // Create a new patient
  //

  async createPatient(
    createPatientDto: CreatePatientDto,
    user: User,
  ): Promise<Patient> {
    const { name, gender } = createPatientDto;

    const patient = this.create({
      name,
      gender,
      user,
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
