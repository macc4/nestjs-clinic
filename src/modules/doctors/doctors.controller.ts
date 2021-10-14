import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../auth/utils/jwt.guard';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';

@Controller('doctors')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('doctors')
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  //
  // Get doctor by id
  //

  @Get('/:id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  @ApiOkResponse({
    description: 'Returns found doctor',
    type: Doctor,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  getDoctorById(@Param('id') id: string): Promise<Doctor> {
    return this.doctorsService.getDoctorById(+id);
  }
}
