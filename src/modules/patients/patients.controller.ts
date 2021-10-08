import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePatientDto } from './dto/CreatePatient.dto';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  //
  // Create a new resolution
  //

  @Post()
  @ApiOperation({ summary: 'Create a new patient' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created patient',
    type: Patient,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns Bad Request if input data is wrong',
  })
  createResolution(
    @Body() createPatientDto: CreatePatientDto,
  ): Promise<Patient> {
    return this.patientsService.createPatient(createPatientDto);
  }

  //
  // Get patient by id
  //

  @Get('/:id')
  @ApiOperation({ summary: 'Get patient by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns found patient',
    type: Patient,
  })
  @ApiResponse({
    status: 404,
    description: 'Returns Not Found if no data found with that ID',
  })
  getPatientById(@Param('id') id: number): Promise<Patient> {
    return this.patientsService.getPatientById(id);
  }
}
