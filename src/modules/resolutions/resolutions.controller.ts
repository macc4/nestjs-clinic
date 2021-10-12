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
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { GetUser } from '../auth/utils/get-user.decorator';
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
  //
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
  //
  createResolution(
    @Body() createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    return this.resolutionsService.createResolution(createResolutionDto);
  }

  //
  // Get all resolutions with an optional query
  //

  @Get()
  //
  @ApiOperation({ summary: 'Get resolutions with an optional query' })
  @ApiResponse({
    status: 200,
    description: 'Returns found resolutions or an empty list',
    type: [Resolution],
  })
  //
  getResolutions(
    @Query() filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    return this.resolutionsService.getResolutions(filterDto);
  }

  //
  // Get personal resolutions
  //

  @Get('me')
  @UseGuards(AuthGuard())
  //
  @ApiOperation({ summary: 'Get personal resolutions' })
  @ApiBearerAuth()
  @ApiOkResponse({
    description: 'Returns found resolutions or an empty list',
    type: [Resolution],
  })
  //
  getMyResolutions(@GetUser() user: User): Promise<Resolution[]> {
    return this.resolutionsService.getMyResolutions(user);
  }

  //
  // Get resolution by id
  //

  @Get('/:id')
  //
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
  //
  getResolutionById(@Param('id') id: number): Promise<Resolution> {
    return this.resolutionsService.getResolutionById(id);
  }

  //
  // Delete resolution by id
  //

  @Delete('/:id')
  //
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
  //
  deleteResolutionById(@Param('id') id: number): Promise<void> {
    return this.resolutionsService.deleteResolutionById(id);
  }
}
