import { GetUser, GetUserDto, JwtGuard } from '@macc4-clinic/common';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PatchProfileDto } from './dto/patch-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileService } from './profile.service';

@Controller('profile')
@ApiTags('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

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
    return this.profileService.getPersonalProfile(user);
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
    return this.profileService.patchPersonalProfile(user, patchProfileDto);
  }
}
