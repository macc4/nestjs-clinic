import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { Doctor } from './entities/doctor.entity';

@EntityRepository(Doctor)
export class DoctorsRepository extends Repository<Doctor> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }

  //
  // Get doctor by ID
  //

  async getDoctorById(id: number): Promise<Doctor> {
    const query = `
    SELECT doctors.*
    FROM clinic.doctors
    WHERE doctors.id = '${id}'
    `;

    const [doctor] = await this.pool.query(query);

    return doctor;
  }

  //
  // Get doctor by user ID
  //

  async getDoctorByUserId(userId: string): Promise<Doctor> {
    const query = `
    SELECT doctors.*
    FROM clinic.doctors
    WHERE doctors.user_id = '${userId}'
    `;

    const [doctor] = await this.pool.query(query);

    return doctor;
  }
}
