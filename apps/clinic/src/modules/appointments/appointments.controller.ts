import { GetUser, GetUserDto, JwtGuard } from '@macc4-clinic/common';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@Controller('appointments')
@UseGuards(JwtGuard)
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  //
  // Create a new Appointment
  //

  @Post()
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
  getMyAppointments(@GetUser() user: GetUserDto): Promise<Appointment[]> {
    return this.appointmentsService.getMyAppointments(user);
  }

  //
  // Get Appointment by id
  //

  @Get(':id')
  getAppointmentById(@Param('id') id: number): Promise<Appointment> {
    return this.appointmentsService.getAppointmentById(id);
  }
}
