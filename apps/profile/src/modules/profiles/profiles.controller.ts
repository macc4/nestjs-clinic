import { GetUser, GetUserDto, JwtGuard } from '@macc4-clinic/common';
import {
  Body,
  Controller,
  Get,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
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
  constructor(private profilesService: ProfilesService) {}

  //
  // Create a new Profile
  //

  @Post()
  createPatient(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesService.createProfile(createProfileDto);
  }

  //
  // Get batch Profiles by User id's
  //

  @Get('batch')
  getBatchProfiles(@Body() userData: GetBatchProfilesDto): Promise<Profile[]> {
    const { userIds } = userData;

    return this.profilesService.getBatchProfiles(userIds);
  }

  //
  // Get personal Profile
  //

  @Get('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Get personal profile' })
  @ApiOkResponse({
    description: 'Returns found Profile',
    type: Profile,
  })
  @ApiNotFoundResponse({
    description: 'Returns Not Found if no data found with that user id',
  })
  getPersonalProfile(@GetUser('id') user: GetUserDto): Promise<Profile> {
    return this.profilesService.getPersonalProfile(user);
  }

  //
  // Patch personal Profile
  //

  @Patch('me')
  @UseGuards(JwtGuard)
  @ApiOperation({ summary: 'Patch personal profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns patched profile',
    type: Profile,
  })
  patchPersonalProfile(
    @GetUser() user: GetUserDto,
    @Body() patchProfileDto: PatchProfileDto,
  ): Promise<Profile> {
    return this.profilesService.patchPersonalProfile(user, patchProfileDto);
  }
}
