import { GetUserDto } from '@macc4-clinic/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BucketStorageService } from '../shared/bucket-storage/bucket-storage.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PatchProfileDto } from './dto/patch-profile.dto';
import { Profile } from './entities/profile.entity';
import { ProfileRepository } from './profile.repository';

Injectable();
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
    private readonly bucketStorageService: BucketStorageService,
  ) {}

  //
  // Create a new Profile
  //

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    return this.profileRepository.createProfile(createProfileDto);
  }

  //
  // Get Profile by User ID
  //

  async getProfileByUserId(userId: string): Promise<Profile> {
    const profile = await this.profileRepository.getProfileByUserId(userId);

    if (!profile) {
      throw new NotFoundException(`No Profile found with user ID: ${userId}`);
    }

    return profile;
  }

  //
  // Get batch Profiles
  //

  async getBatchProfiles(userIds: string[]): Promise<Profile[]> {
    const profiles = await this.profileRepository.getBatchProfiles(userIds);

    return profiles;
  }

  //
  // Get personal Profile
  //

  async getPersonalProfile(user: GetUserDto): Promise<Profile> {
    const profile = await this.profileRepository.getProfileByUserId(user.id);

    return profile;
  }

  //
  // Patch personal Profile
  //

  async patchPersonalProfile(
    user: GetUserDto,
    image: Express.Multer.File,
    patchProfileDto: PatchProfileDto,
  ): Promise<Profile> {
    console.log(process.env.AWS_ACCESS_KEY_ID);

    const returnedImage = await this.bucketStorageService.uploadImage(
      image,
      user.id,
    );

    console.log(returnedImage);

    patchProfileDto.avatarUrl = returnedImage.Location;

    const profile = await this.profileRepository.patchPersonalProfile(
      user,
      patchProfileDto,
    );

    return profile;
  }
}
