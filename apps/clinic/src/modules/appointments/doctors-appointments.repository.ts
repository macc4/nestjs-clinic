import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { GetDoctorsAppointmentsQueryDto } from './dto/get-doctors-appointments-query.dto';
import { Appointment } from './entities/appointment.entity';
import { snakeToCamel } from '@macc4-clinic/common';

@EntityRepository(Appointment)
export class DoctorsAppointmentsRepository extends Repository<Appointment> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }

  // this method can be reused, I might merge repositories into one

  async getAppointmentsByDoctorId(
    id: number,
    filters: GetDoctorsAppointmentsQueryDto,
  ): Promise<Appointment[]> {
    let query = `
    SELECT appointments.*
    FROM clinic.appointments
    INNER JOIN clinic.doctors
      ON doctors.id = appointments.doctor_id
    WHERE doctors.id = '${id}'
    `;

    if (filters.date) {
      if (filters.date.length < 11) {
        query += `
        AND appointments.visit_date::text LIKE '${filters.date}%'
        `;
      } else {
        const date = new Date(filters.date).toISOString();

        query += `
        AND appointments.visit_date = '${date}'
        `;
      }
    }

    const appointments = (await this.pool.query(query)).map((appointment) =>
      snakeToCamel(appointment),
    );

    return appointments;
  }
}
