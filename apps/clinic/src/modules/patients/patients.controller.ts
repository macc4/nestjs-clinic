import { Roles, RolesGuard, UserRole, JwtGuard } from '@macc4-clinic/common';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
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
  constructor(private readonly patientsService: PatientsService) {}

  //
  // Create a new Patient (for http requests from auth only)
  //

  @Post()
  @ApiOperation({ summary: 'Create a Patient (used internally only)' })
  @ApiCreatedResponse({
    description: 'Returns the created Patient data',
    type: Patient,
  })
  createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.createPatient(createPatientDto);
  }

  //
  // Get Patient by id
  //

  @Get(':id')
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get Patient by ID' })
  @ApiOkResponse({
    description: 'Returns the Patient data',
    type: Patient,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  getPatientById(@Param('id', ParseIntPipe) id: number): Promise<Patient> {
    return this.patientsService.getPatientById(id);
  }
}
