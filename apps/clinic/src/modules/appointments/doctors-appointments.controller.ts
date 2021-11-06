import { JwtGuard } from '@macc4-clinic/common';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DoctorsAppointmentsService } from './doctors-appointments.service';
import { GetDoctorsAppointmentsQueryDto } from './dto/get-doctors-appointments-query.dto';
import { Appointment } from './entities/appointment.entity';

@Controller()
@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class DoctorsAppointmentsController {
  constructor(
    private readonly doctorsAppointmentsService: DoctorsAppointmentsService,
  ) {}

  //
  // Get all Appointments for specific doctor Id
  //

  @Get()
  @ApiOperation({ summary: 'Get Appointments for a specific Doctor' })
  @ApiOkResponse({
    description:
      'Returns Appointments for the given doctor or an empty list if no data found',
    type: [Appointment],
  })
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
  @ApiOperation({ summary: 'Get free hour timeslots for a specific Doctor' })
  @ApiOkResponse({
    description:
      'Returns a list of hours that are available during the day or an empty list',
    type: [Appointment],
  })
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
