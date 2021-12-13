import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';
import { GetUserDto } from '@macc4-clinic/common';
import { PatchProfileDto } from './dto/patch-profile.dto';

const mockProfile = new Profile();
const mockCreateProfileDto = new CreateProfileDto();
const mockGetUserDto = new GetUserDto();
const mockPatchProfileDto = new PatchProfileDto();

describe('ProfileService', () => {
  let profileService: ProfileService;
  let profileRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: ProfileRepository,
          useValue: {
            createProfile: jest.fn(),
            getProfileByUserId: jest.fn(),
            getBatchProfiles: jest.fn(),
            patchPersonalProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    profileService = module.get(ProfileService);
    profileRepository = module.get(ProfileRepository);
  });

  describe('calls createProfile', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      profileRepository.createProfile.mockResolvedValue(mockProfile);

      expect(await profileService.createProfile(mockCreateProfileDto)).toEqual(
        mockProfile,
      );
    });
  });

  describe('calls getProfileByUserId', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      profileRepository.getProfileByUserId.mockResolvedValue(mockProfile);

      expect(
        await profileService.getProfileByUserId(
          '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
        ),
      ).toEqual(mockProfile);
    });
  });

  describe('calls getBatchProfiles', () => {
    it('returns the [data]', async () => {
      expect.assertions(1);

      profileRepository.getBatchProfiles.mockResolvedValue([mockProfile]);

      expect(
        await profileService.getBatchProfiles([
          '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
        ]),
      ).toEqual([mockProfile]);
    });
  });

  describe('calls getPersonalProfile', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      profileRepository.getProfileByUserId.mockResolvedValue(mockProfile);

      expect(await profileService.getPersonalProfile(mockGetUserDto)).toEqual(
        mockProfile,
      );
    });
  });

  describe('calls patchPersonalProfile', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      profileRepository.patchPersonalProfile.mockResolvedValue(mockProfile);

      expect(
        await profileService.patchPersonalProfile(
          mockGetUserDto,
          mockPatchProfileDto,
        ),
      ).toEqual(mockProfile);
    });
  });
});
