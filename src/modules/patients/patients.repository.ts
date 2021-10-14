import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';

@EntityRepository(Patient)
export class PatientsRepository extends Repository<Patient> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }
  //
  // Create a new patient
  //

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    const { name, gender, user } = createPatientDto;

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

  //
  // Get patient by user ID
  //

  async getPatientByUserId(userId: string): Promise<Patient> {
    const query = `SELECT *
    FROM patient
    WHERE patient.userId="${userId}"`;

    const [patient] = await this.pool.query(query);

    return patient;
  }
}
