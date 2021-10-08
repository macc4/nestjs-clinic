import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Patient } from './patient.entity';
import { PatientsService } from './patients.service';

@ApiTags('patients')
@Controller('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

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
