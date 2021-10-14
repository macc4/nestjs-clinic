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
    const doctor = await this.findOne(id);

    return doctor;
  }

  //
  // Get doctor by user ID
  //

  async getDoctorByUserId(userId: string): Promise<Doctor> {
    const query = `SELECT *
    FROM doctor
    WHERE doctor.userId="${userId}"`;

    const [doctor] = await this.pool.query(query);

    return doctor;
  }
}
