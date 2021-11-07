import { GetUser, GetUserDto, JwtGuard } from '@macc4-clinic/common';
import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
import { GetBatchProfilesDto } from './dto/get-batch-profiles.dto';
import { PatchProfileDto } from './dto/patch-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
@ApiTags('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  //
  // Create a new Profile
  //

  @Post()
  @ApiOperation({ summary: 'Create a Profile (for internal use only)' })
  @ApiCreatedResponse({
    description: 'Returns the created Profile',
    type: Profile,
  })
  createPatient(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(createProfileDto);
  }

  //
  // Get batch Profiles by User id's
  //

  @Get('batch')
  @ApiOperation({ summary: 'Get a batch list of Profiles' })
  @ApiOkResponse({
    description: 'Returns a list of profiles or an empty array',
    type: [Profile],
  })
  getBatchProfiles(@Query('userIds') userIds: string): Promise<Profile[]> {
    return this.profilesService.getBatchProfiles(JSON.parse(userIds));
  }

  //
  // Get personal Profile
  //

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get a personal Profile' })
  @ApiOkResponse({
    description: 'Returns the found Profile',
    type: Profile,
  })
  getPersonalProfile(@GetUser('id') user: GetUserDto): Promise<Profile> {
    return this.profilesService.getPersonalProfile(user);
  }

  //
  // Patch personal Profile
  //

  @Patch('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Patch a personal profile' })
  @ApiOkResponse({
    description: 'Returns the patched Profile',
    type: Profile,
  })
  patchPersonalProfile(
    @GetUser() user: GetUserDto,
    @Body() patchProfileDto: PatchProfileDto,
  ): Promise<Profile> {
    return this.profilesService.patchPersonalProfile(user, patchProfileDto);
  }
}
