import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
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
import { PatchResolutionDto } from './dto/patch-resolution.dto';

@Controller('resolutions')
@UseGuards(JwtGuard, RolesGuard)
@ApiTags('resolutions')
@ApiBearerAuth()
export class ResolutionsController {
  constructor(private readonly resolutionsService: ResolutionsService) {}

  //
  // Create a new Resolution
  //

  @Post()
  @Roles(UserRole.DOCTOR)
  @ApiOperation({ summary: 'Create a new Resolution' })
  @ApiCreatedResponse({
    description: 'Returns the created Resolution',
    type: Resolution,
  })
  @ApiBadRequestResponse({
    description: 'Returns Bad Request if input data is wrong',
  })
  createResolution(
    @GetUser() user: GetUserDto,
    @Body() createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    return this.resolutionsService.createResolution(user, createResolutionDto);
  }

  //
  // Get all Resolutions (with optional filters)
  //

  @Get()
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get Resolutions with an optional query' })
  @ApiOkResponse({
    description: 'Returns found Resolutions or an empty list',
    type: [Resolution],
  })
  getResolutions(
    @Query() filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    return this.resolutionsService.getResolutions(filterDto);
  }

  //
  // Get personal Resolutions
  //

  @Get('me')
  @Roles(UserRole.PATIENT)
  @ApiOperation({ summary: 'Get personal Resolutions' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns found Resolutions or an empty list',
    type: [Resolution],
  })
  getMyResolutions(@GetUser() user: GetUserDto): Promise<Resolution[]> {
    return this.resolutionsService.getMyResolutions(user);
  }

  //
  // Get Resolution by id
  //

  @Get(':id')
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get Resolution by ID' })
  @ApiOkResponse({
    description: 'Returns found Resolution',
    type: Resolution,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  getResolutionById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Resolution> {
    return this.resolutionsService.getResolutionById(id);
  }

  //
  // Update Resolution by id
  //

  @Patch(':id')
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Patch resolution by ID' })
  @ApiOkResponse({
    description: 'Returns patched Resolution',
    type: Resolution,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that ID',
  })
  patchResolutionById(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchResolutionDto: PatchResolutionDto,
  ): Promise<Resolution> {
    return this.resolutionsService.patchResolutionById(id, patchResolutionDto);
  }

  //
  // Delete Resolution by id
  //

  @Delete(':id')
  @Roles(UserRole.DOCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete Resolution by ID' })
  @ApiNoContentResponse({
    description: 'Returns nothing if the Resolution was deleted',
    type: undefined,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found by that ID',
  })
  deleteResolutionById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.resolutionsService.deleteResolutionById(id);
  }
}
