import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetUser,
  RolesGuard,
  Roles,
  UserRole,
  JwtGuard,
  GetUserDto,
} from '@macc4-clinic/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './entities/resolution.entity';
import { ResolutionsService } from './resolutions.service';

@Controller('resolutions')
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('resolutions')
@ApiBearerAuth()
export class ResolutionsController {
  constructor(private resolutionsService: ResolutionsService) {}

  //
  // Create a new resolution
  //

  @Post()
  @Roles(UserRole.DOCTOR)
  @ApiOperation({ summary: 'Create a new resolution' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created resolution',
    type: Resolution,
  })
  @ApiResponse({
    status: 400,
    description: 'Returns Bad Request if input data is wrong',
  })
  createResolution(
    @Body() createResolutionDto: CreateResolutionDto,
    @GetUser() user: GetUserDto,
  ): Promise<Resolution> {
    return this.resolutionsService.createResolution(createResolutionDto, user);
  }

  //
  // Get all resolutions with an optional query
  //

  @Get()
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get resolutions with an optional query' })
  @ApiResponse({
    status: 200,
    description: 'Returns found resolutions or an empty list',
    type: [Resolution],
  })
  getResolutions(
    @Query() filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    return this.resolutionsService.getResolutions(filterDto);
  }

  //
  // Get personal resolutions
  //

  @Get('me')
  @Roles(UserRole.PATIENT)
  @ApiOperation({ summary: 'Get personal resolutions' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns found resolutions or an empty list',
    type: [Resolution],
  })
  getMyResolutions(@GetUser() user: GetUserDto): Promise<Resolution[]> {
    return this.resolutionsService.getMyResolutions(user);
  }

  //
  // Get resolution by id
  //

  @Get('/:id')
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get resolution by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns found resolution',
    type: Resolution,
  })
  @ApiResponse({
    status: 404,
    description: 'Returns Not Found if no data found with that ID',
  })
  getResolutionById(@Param('id') id: string): Promise<Resolution> {
    return this.resolutionsService.getResolutionById(+id);
  }

  //
  // Delete resolution by id
  //

  @Delete('/:id')
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete resolution by ID' })
  @ApiResponse({
    status: 204,
    description: 'Returns nothing',
    type: undefined,
  })
  @ApiResponse({
    status: 404,
    description: 'Returns Not Found if no data by that ID',
  })
  deleteResolutionById(@Param('id') id: string): Promise<void> {
    return this.resolutionsService.deleteResolutionById(+id);
  }
}