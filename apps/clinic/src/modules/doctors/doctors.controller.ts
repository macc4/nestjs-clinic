import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser, GetUserDto, JwtGuard } from '@macc4-clinic/common';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsService } from './specializations.service';
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';

@Controller('doctors')
@UseGuards(JwtGuard)
@ApiBearerAuth()
@ApiTags('doctors')
export class DoctorsController {
  constructor(
    private readonly doctorsService: DoctorsService,
    private readonly specializationsService: SpecializationsService,
  ) {}

  //
  // Get doctors (with optional filters)
  //

  @Get()
  @ApiOperation({ summary: 'Get all doctors' })
  @ApiOkResponse({
    description: 'Returns found doctors',
    type: Doctor,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found',
  })
  getDoctors(@Query() filters: GetDoctorsQueryDto): Promise<Doctor[]> {
    return this.doctorsService.getDoctors(filters);
  }

  //
  // Get all Specializations
  //

  @Get('specializations')
  @ApiOperation({ summary: 'Get all specializations' })
  @ApiOkResponse({
    description: 'Returns found specializations',
    type: Specialization,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found',
  })
  getSpecializations(): Promise<Specialization[]> {
    return this.specializationsService.getSpecializations();
  }

  //
  // Get personal doctors profile
  //

  @Get('me')
  @ApiOperation({ summary: 'Get personal doctors profile' })
  @ApiOkResponse({
    description: 'Returns data',
    type: Doctor,
  })
  getPersonalDoctorProfile(@GetUser() user: GetUserDto): Promise<Doctor> {
    return this.doctorsService.getPersonalDoctorProfile(user);
  }

  //
  // Get doctor by id
  //

  @Get(':id')
  @ApiOperation({ summary: 'Get doctor by ID' })
  @ApiOkResponse({
    description: 'Returns found doctor',
    type: Doctor,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  getDoctorById(@Param('id') id: number): Promise<Doctor> {
    return this.doctorsService.getDoctorById(id);
  }
}
