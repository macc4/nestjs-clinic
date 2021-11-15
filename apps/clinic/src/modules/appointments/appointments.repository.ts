import { snakeToCamel } from '@macc4-clinic/common';
import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { Doctor } from '../doctors/entities/doctor.entity';
import { Patient } from '../patients/entities/patient.entity';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetMyAppointmentsResponseDto } from './dto/get-my-appointments-response.dto';
import { Appointment } from './entities/appointment.entity';

@EntityRepository(Appointment)
export class AppointmentsRepository extends Repository<Appointment> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }

  async createAppointment(
    patient: Patient,
    doctor: Doctor,
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const { reason, note, visitDate } = createAppointmentDto;

    const appointment = this.create({
      reason,
      note,
      visitDate,
      patient,
      doctor,
    });

    await this.save(appointment);

    return appointment;
  }

  //
  // Get personal Appointments
  //

  async getMyAppointments(id: string): Promise<GetMyAppointmentsResponseDto[]> {
    const query = `
    SELECT appointments.id, appointments.reason, appointments.note, appointments.visit_date, patients.user_id AS patient_user_id, doctors.user_id as doctor_user_id
    FROM clinic.appointments
    INNER JOIN clinic.patients
      ON patients.id = appointments.patient_id
    INNER JOIN clinic.doctors
      ON doctors.id = appointments.doctor_id
    WHERE patients.user_id = '${id}'
    OR doctors.user_id = '${id}';
    `;

    const appointments = (await this.pool.query(query)).map((appointment) =>
      snakeToCamel(appointment),
    );

    return appointments;
  }

  //
  // Get Appointment by id
  //

  async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.findOne(id);

    return appointment;
  }

  //
  // Get Appointment by visitDate
  //

  async getAppointmentByDoctorIdAndVisitDate(
    id: number,
    date: string,
  ): Promise<Appointment> {
    const query = `
    SELECT *
    FROM clinic.appointments
    INNER JOIN clinic.patients
      ON patients.id = appointments.patient_id
    INNER JOIN clinic.doctors
      ON doctors.id = appointments.doctor_id
    WHERE appointments.visit_date = '${date}'
    AND doctors.id = ${id}
    `;

    const [appointments] = (await this.pool.query(query)).map((appointment) =>
      snakeToCamel(appointment),
    );

    return appointments;
  }
}
