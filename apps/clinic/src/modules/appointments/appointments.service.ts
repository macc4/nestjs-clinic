import { GetUserDto } from '@macc4-clinic/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientsService } from '../patients/patients.service';
import { AppointmentsRepository } from './appointments.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsRepository)
    private appointmentsRepository: AppointmentsRepository,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  //
  // Create a new resolution
  //

  async createAppointment(
    user: GetUserDto,
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    const patient = await this.patientsService.getPatientByUserId(user.id);

    const doctor = await this.doctorsService.getDoctorById(
      createAppointmentDto.doctorId,
    );

    createAppointmentDto.visitDate = new Date(createAppointmentDto.visitDate);

    // check if the visitDate is occupied or not

    // check if it is a day off

    return this.appointmentsRepository.createAppointment(
      patient,
      doctor,
      createAppointmentDto,
    );
  }

  //
  // Get personal Appointments
  //

  async getMyAppointments(user: GetUserDto): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.getMyAppointments(
      user.id,
    );

    return appointments;
  }

  //
  // Get Appointment by id
  //

  async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.getAppointmentById(
      id,
    );

    if (!appointment) {
      throw new NotFoundException(`No appointment found with ID: ${id}`);
    }

    return appointment;
  }
}
