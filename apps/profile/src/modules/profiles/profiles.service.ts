import { GetUserDto } from '@macc4-clinic/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfilesRepository } from './profiles.repository';

Injectable();
export class ProfilesService {
  constructor(
    @InjectRepository(ProfilesRepository)
    private profilesRepository: ProfilesRepository,
  ) {}

  //
  // Create a new Profile
  //

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profilesRepository.createProfile(createProfileDto);
  }

  //
  // Get Profile by user ID
  //

  async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.profilesRepository.getProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundException(`No Profile found with user ID: ${userId}`);
    }

    return profile;
  }

  //
  // Get Profile by user ID
  //

  async getBatchProfiles(userIds: string[]): Promise<Profile[]> {
    const profiles = await this.profilesRepository.getBatchProfiles(userIds);

    if (!profiles) {
      throw new NotFoundException(`No Profile found with user ID: ${userIds}`);
    }

    return profiles;
  }

  //
  // Get personal Profile
  //

  async getPersonalProfile(user: GetUserDto): Promise<Profile> {
    const profile = await this.profilesRepository.getProfileByUserId(user.id);

    return profile;
  }
}
