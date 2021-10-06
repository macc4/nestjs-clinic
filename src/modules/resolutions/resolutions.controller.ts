import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './resolution.entity';
import { ResolutionsService } from './resolutions.service';

@ApiTags('resolutions')
@Controller('resolutions')
export class ResolutionsController {
  constructor(private resolutionsService: ResolutionsService) {}

  //
  // Create a new resolution
  //

  @Post()
  @ApiOperation({ summary: 'Create a new resolution' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created resolution',
    type: Resolution,
  })
  createResolution(
    @Body() createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    return this.resolutionsService.createResolution(createResolutionDto);
  }

  //
  // Get all resolutions with an optional query
  //

  @Get()
  @ApiOperation({ summary: 'Get resolutions with optional query' })
  @ApiResponse({
    status: 200,
    description: 'Returns found resolutions',
    type: [Resolution],
  })
  getResolutions(
    @Query() filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    return this.resolutionsService.getResolutions(filterDto);
  }

  //
  // Get resolution by id
  //

  @Get('/:id')
  @ApiOperation({ summary: 'Get resolution by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns the found resolution',
    type: Resolution,
  })
  getResolutionById(@Param('id') id: number): Promise<Resolution> {
    return this.resolutionsService.getResolution(id);
  }

  //
  // Delete resolution by id
  //

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete resolution by ID' })
  @ApiResponse({
    status: 204,
    description: 'Returns nothing if successful',
    type: undefined,
  })
  deleteResolution(@Param('id') id: number): Promise<void> {
    return this.resolutionsService.deleteResolution(id);
  }
}
