import { Roles, RolesGuard, UserRole, JwtGuard } from '@macc4-clinic/common';
import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { Patient } from './entities/patient.entity';
import { PatientsService } from './patients.service';

@Controller('patients')
@ApiBearerAuth()
@ApiTags('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

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
