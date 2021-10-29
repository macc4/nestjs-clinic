import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserRole } from '../common/enums/user-role.enum';
import { JwtGuard } from '../common/utils/jwt.guard';
import { Roles } from '../common/utils/restrict-roles.decorator';
import { RolesGuard } from '../common/utils/restrict-roles.guard';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
import { PatientsService } from './patients.service';

@Controller('patients')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  //
  // Create a new Patient
  //

  @Post()
  createPatient(@Body() createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsService.createPatient(createPatientDto);
  }

  //
  // Get Patient by id
  //

  @Get('/:id')
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
