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
    const Profile = await this.profilesRepository.getProfileByUserId(userId);

    if (!Profile) {
      throw new NotFoundException(`No Profile found with user ID: ${userId}`);
    }

    return Profile;
  }
}
