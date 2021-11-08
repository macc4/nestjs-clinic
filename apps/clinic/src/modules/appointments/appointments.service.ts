import { GetUserDto } from '@macc4-clinic/common';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUIDVersion } from 'class-validator';
import { DoctorsService } from '../doctors/doctors.service';
import { HttpProfileService } from '../http/http-profile.service';
import { PatientsService } from '../patients/patients.service';
import { AppointmentsRepository } from './appointments.repository';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetMyAppointmentsResponseDto } from './dto/get-my-appointments-response.dto';
import { Appointment } from './entities/appointment.entity';
import { WORKING_HOURS } from './utils/constants';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(AppointmentsRepository)
    private readonly appointmentsRepository: AppointmentsRepository,
    private readonly patientsService: PatientsService,
    private readonly doctorsService: DoctorsService,
    private readonly httpProfileService: HttpProfileService,
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

    // might be better suited in the dto
    createAppointmentDto.visitDate = new Date(createAppointmentDto.visitDate);

    // check if it is a day off

    // TODO

    // check if the appointment visitDate is within working hours

    const visitDateHour = new Date(createAppointmentDto.visitDate).getHours();

    if (
      visitDateHour < WORKING_HOURS.start ||
      visitDateHour > WORKING_HOURS.end
    ) {
      throw new BadRequestException(
        `Appointment time should be within working hours (${WORKING_HOURS.start} - ${WORKING_HOURS.end})`,
      );
    }

    // check if the visitDate is occupied or not

    let occupied: Appointment;

    try {
      occupied = await this.getAppointmentByDoctorIdAndVisitDate(
        createAppointmentDto.doctorId,
        createAppointmentDto.visitDate,
      );
    } catch (error) {}

    if (occupied) {
      throw new ConflictException('You must choose a free timeslot');
    }

    return this.appointmentsRepository.createAppointment(
      patient,
      doctor,
      createAppointmentDto,
    );
  }

  //
  // Get personal Appointments
  //

  async getMyAppointments(
    user: GetUserDto,
  ): Promise<GetMyAppointmentsResponseDto[]> {
    const appointments = await this.appointmentsRepository.getMyAppointments(
      user.id,
    );

    const patientUserIds: UUIDVersion[] = [
      ...new Set(
        appointments.map((appointment) => appointment.patient_user_id),
      ),
    ];

    const doctorUserIds: UUIDVersion[] = [
      ...new Set(appointments.map((appointment) => appointment.doctor_user_id)),
    ];

    const userIds: UUIDVersion[] = patientUserIds.concat(doctorUserIds);

    const profiles = await this.httpProfileService.getBatchProfiles({
      userIds,
    });

    const appointmentsAndProfiles: GetMyAppointmentsResponseDto[] = [];

    appointments.forEach((appointment) => {
      const doctor = profiles.find(
        (profile) => profile.user_id === appointment.doctor_user_id,
      );

      appointment.doctor_name = doctor.name;

      const patient = profiles.find(
        (profile) => profile.user_id === appointment.patient_user_id,
      );

      console.log(appointments);

      appointment.patient_name = patient.name;

      appointmentsAndProfiles.push(appointment);
    });

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

  //
  // Get Appointment by id
  //

  async getAppointmentByDoctorIdAndVisitDate(
    id: number,
    visitDate: Date,
  ): Promise<Appointment> {
    const date = visitDate.toISOString();

    const appointment =
      await this.appointmentsRepository.getAppointmentByDoctorIdAndVisitDate(
        id,
        date,
      );

    if (!appointment) {
      throw new NotFoundException(
        `No appointment found for date: ${date} and doctor (id ${id})`,
      );
    }

    return appointment;
  }
}
