import {
  GetUser,
  GetUserDto,
  JwtGuard,
  Roles,
  RolesGuard,
  UserRole,
} from '@macc4-clinic/common';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { GetMyAppointmentsResponseDto } from './dto/get-my-appointments-response.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointments')
@ApiTags('appointments')
@ApiBearerAuth()
@UseGuards(JwtGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  //
  // Create a new Appointment
  //

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.PATIENT)
  @ApiOperation({ summary: 'Create a new Appointment' })
  @ApiCreatedResponse({
    description: 'Returns the created Appointment data',
    type: Appointment,
  })
  @ApiConflictResponse({
    description: 'Returns Conflict the visitDate timeslot is taken',
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if doctorId is invalid',
  })
  @ApiBadRequestResponse({
    description:
      'Returns Bad Request if the visitDate is not within working hours',
  })
  createAppointment(
    @GetUser() user: GetUserDto,
    @Body() createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    return this.appointmentsService.createAppointment(
      user,
      createAppointmentDto,
    );
  }

  //
  // Get personal Appointments
  //

  @Get('me')
  @ApiOperation({ summary: 'Get personal Appointments for patient and doctor' })
  @ApiOkResponse({
    description:
      'Returns personal Appointments or an empty list of no data found',
    type: [Appointment],
  })
  getMyAppointments(
    @GetUser() user: GetUserDto,
  ): Promise<GetMyAppointmentsResponseDto[]> {
    return this.appointmentsService.getMyAppointments(user);
  }

  //
  // Get Appointment by id
  //

  @Get(':id')
  @ApiOperation({ summary: 'Get Appointment by id' })
  @ApiOkResponse({
    description: 'Returns the Appointment data',
    type: [Appointment],
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found',
  })
  getAppointmentById(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentsService.getAppointmentById(id);
  }
}
