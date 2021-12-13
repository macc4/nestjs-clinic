import { snakeToCamel } from '@macc4-clinic/common';
import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';
import { Doctor } from './entities/doctor.entity';

@EntityRepository(Doctor)
export class DoctorsRepository extends Repository<Doctor> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }

  //
  // Get doctors (with optional filters)
  //

  async getDoctors(filters?: GetDoctorsQueryDto): Promise<Doctor[]> {
    // add profile here
    let query = `
    SELECT doctors.id, doctors.user_id, specializations.title AS specialization
    FROM clinic.doctors
    INNER JOIN 
      clinic.doctor_specializations
    ON doctor_specializations.doctor_id = doctors.id
    INNER JOIN
      clinic.specializations
    ON specializations.id = doctor_specializations.specialization_id
    `;

    if (filters.specialization) {
      query += `
      WHERE specializations.title = '${filters.specialization}'
      `;
    }

    const doctors = (await this.pool.query(query)).map((doctor) =>
      snakeToCamel(doctor),
    );

    return doctors;
  }

  //
  // Get doctor by ID
  //

  async getDoctorById(id: number): Promise<Doctor> {
    const query = `
    SELECT doctors.id, doctors.user_id, specializations.title AS specialization
    FROM clinic.doctors
    INNER JOIN 
      clinic.doctor_specializations
    ON doctor_specializations.doctor_id = doctors.id
    INNER JOIN
      clinic.specializations
    ON specializations.id = doctor_specializations.specialization_id
    WHERE doctors.id = '${id}'
    `;

    const [doctor] = await this.pool.query(query);

    return snakeToCamel(doctor);
  }

  //
  // Get doctor by user ID
  //

  async getDoctorByUserId(userId: string): Promise<Doctor> {
    const query = `
    SELECT doctors.id, doctors.user_id, specializations.title AS specialization
    FROM clinic.doctors
    INNER JOIN 
      clinic.doctor_specializations
    ON doctor_specializations.doctor_id = doctors.id
    INNER JOIN
      clinic.specializations
    ON specializations.id = doctor_specializations.specialization_id
    WHERE doctors.user_id = '${userId}'
    `;

    const [doctor] = await this.pool.query(query);

    return snakeToCamel(doctor);
  }
}
