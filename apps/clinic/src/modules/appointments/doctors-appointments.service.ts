import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
import { DoctorsAppointmentsRepository } from './doctors-appointments.repository';
import { GetDoctorsAppointmentsQueryDto } from './dto/get-doctors-appointments-query.dto';
import { Appointment } from './entities/appointment.entity';
import { WORKING_HOURS } from './utils/constants';

@Injectable()
export class DoctorsAppointmentsService {
  constructor(
    @InjectRepository(DoctorsAppointmentsRepository)
    private doctorsAppointmentsRepository: DoctorsAppointmentsRepository,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  //
  // Get apopintments by doctorId
  //

  async getAppointmentsByDoctorId(
    id: number,
    filters: GetDoctorsAppointmentsQueryDto,
  ): Promise<Appointment[]> {
    await this.doctorsService.getDoctorById(id);

    return this.doctorsAppointmentsRepository.getAppointmentsByDoctorId(
      id,
      filters,
    );
  }

  //
  // Get apopintments by doctorId
  //

  async getFreeAppointmentsByDoctorId(
    id: number,
    date: string,
  ): Promise<number[]> {
    await this.doctorsService.getDoctorById(id);

    const freeSlots = [];

    const appointments =
      await this.doctorsAppointmentsRepository.getAppointmentsByDoctorId(id, {
        date,
      });

    const occupiedSlots = appointments.map((appointment) =>
      appointment.visit_date.getHours(),
    );

    for (
      let hour = WORKING_HOURS.start;
      hour <= WORKING_HOURS.end;
      hour += WORKING_HOURS.step
    ) {
      if (!occupiedSlots.includes(hour)) {
        freeSlots.push(hour);
      }
    }

    return freeSlots;
  }
}
