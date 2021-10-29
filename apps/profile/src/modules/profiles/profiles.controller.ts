import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProfileDto } from './dto/create-profile.dto';
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
  // Get Profile by User id
  //

  // @Get('/me')
  // @ApiOperation({ summary: 'Get Profile by user id' })
  // @ApiOkResponse({
  //   description: 'Returns found Profile',
  //   type: Profile,
  // })
  // @ApiNotFoundResponse({
  //   description: 'Returns Not Found if no data found with that user id',
  // })
  // getPatientById(@Param('id') id: string): Promise<Profile> {
  //   return this.profilesService.getProfileById(+id);
  // }
}
