import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProfileService } from './profile.service';
import { ProfileRepository } from './profile.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

const mockProfile = new Profile();
const mockCreateProfileDto = new CreateProfileDto();

describe('profileService', () => {
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
            getProfileById: jest.fn(),
            getProfileByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    profileService = module.get(ProfileService);
    profileRepository = module.get(ProfileRepository);
  });

  describe('calls createProfile', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      profileRepository.createProfile.mockResolvedValue(mockProfile);

      expect(await profileService.createProfile(mockCreateProfileDto)).toEqual(
        mockProfile,
      );
    });
  });

  describe('calls getProfileByUserId', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      profileRepository.getProfileByUserId.mockResolvedValue(mockProfile);

      const result = await profileService.getProfileByUserId(
        '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
      );

      expect(result).toEqual(mockProfile);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      profileRepository.getProfileByUserId.mockResolvedValue(null);

      expect(
        profileService.getProfileByUserId(
          '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
