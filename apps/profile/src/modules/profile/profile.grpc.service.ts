import { GrpcMethod } from '@nestjs/microservices';
import { Controller, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { GRPCGuard } from '@macc4-clinic/common';

@Controller('profiles')
@UseGuards(GRPCGuard)
export class ProfileGRPCService {
  constructor(private readonly profileService: ProfileService) {}

  @GrpcMethod('ProfileGRPCService', 'createProfile')
  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return await this.profileService.createProfile(createProfileDto);
  }

  @GrpcMethod('ProfileGRPCService', 'getProfileByUserId')
  async getProfileByUserId({ userId }: { userId: string }): Promise<Profile> {
    const profile = await this.profileService.getProfileByUserId(userId);

    return profile;
  }

  @GrpcMethod('ProfileGRPCService', 'getBatchProfiles')
  async getBatchProfiles({
    userIds,
  }: {
    userIds: string[];
  }): Promise<{ profiles: Profile[] }> {
    const profiles = await this.profileService.getBatchProfiles(userIds);

    return { profiles };
  }
}
