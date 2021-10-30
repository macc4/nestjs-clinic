import { Roles, RolesGuard, UserRole, JwtGuard } from '@macc4-clinic/common';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientsService } from './patients.service';

@Controller('patients')
@ApiBearerAuth()
@ApiTags('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  //
  // Create a new Patient (for http requests from auth only)
  //

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.createPatient(createPatientDto);
  }

  //
  // Get Patient by id
  //

  @Get('/:id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiOkResponse({
    description: 'Returns found patient',
    type: Patient,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  getPatientById(@Param('id') id: string): Promise<Patient> {
    return this.patientsService.getPatientById(+id);
  }
}
