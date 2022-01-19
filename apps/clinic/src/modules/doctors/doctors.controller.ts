import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '@macc4-clinic/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsService } from './specializations.service';
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Controller()
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly specializationsService: SpecializationsService,
  ) {}

  //
  // Get Doctors (with optional filters)
  //

  @Get()
  @ApiOperation({
    summary: 'Get all Doctors with an optional specialization query',
  })
  @ApiOkResponse({
    description: 'Returns found Doctors or an empty list',
    type: [Doctor],
  })
  getDoctors(@Query() filters: GetDoctorsQueryDto): Promise<Doctor[]> {
    return this.doctorsService.getDoctors(filters);
  }

  //
  // Get all Specializations
  //

  @Get('specializations')
  @ApiOperation({ summary: 'Get all Specializations' })
  @ApiOkResponse({
    description: 'Returns found Specializations or an empty list',
    type: [Specialization],
  })
  getSpecializations(): Promise<Specialization[]> {
    return this.specializationsService.getSpecializations();
  }

  //
  // Get Doctor by id
  //

  @Get(':id')
  @ApiOperation({ summary: 'Get Doctor by ID' })
  @ApiOkResponse({
    description: 'Returns the Doctor data',
    type: Doctor,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  getDoctorById(@Param('id', ParseIntPipe) id: number): Promise<Doctor> {
    return this.doctorsService.getDoctorById(id);
  }
}
