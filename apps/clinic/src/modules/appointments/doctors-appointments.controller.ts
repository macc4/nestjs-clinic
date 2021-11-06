import { Controller, Get, Param, Query } from '@nestjs/common';
import { DoctorsAppointmentsService } from './doctors-appointments.service';
import { GetDoctorsAppointmentsQueryDto } from './dto/get-doctors-appointments-query.dto';
import { Appointment } from './entities/appointment.entity';

@Controller()
export class DoctorsAppointmentsController {
  constructor(
    private readonly doctorsAppointmentsService: DoctorsAppointmentsService,
  ) {}

  //
  // Get all Appointments for specific doctor Id
  //

  @Get()
  getAppointmentsByDoctorId(
    @Param('doctorId') doctorId: number,
    @Query() filters: GetDoctorsAppointmentsQueryDto,
  ): Promise<Appointment[]> {
    return this.doctorsAppointmentsService.getAppointmentsByDoctorId(
      doctorId,
      filters,
    );
  }

  //
  // Get all free timeslots for specific doctor Id
  //

  @Get('free')
  getFreeAppointmentsByDoctorId(
    @Param('doctorId') doctorId: number,
    @Query() filters: GetDoctorsAppointmentsQueryDto,
  ): Promise<number[]> {
    return this.doctorsAppointmentsService.getFreeAppointmentsByDoctorId(
      doctorId,
      filters,
    );
  }
}
