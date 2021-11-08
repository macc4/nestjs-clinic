import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { ProfilesService } from './profiles.service';
import { ProfilesRepository } from './profiles.repository';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

const mockProfile = new Profile();
const mockCreateProfileDto = new CreateProfileDto();

describe('profilesService', () => {
  let profilesService: ProfilesService;
  let profilesRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProfilesService,
        {
          provide: ProfilesRepository,
          useValue: {
            createProfile: jest.fn(),
            getProfileById: jest.fn(),
            getProfileByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    profilesService = module.get(ProfilesService);
    profilesRepository = module.get(ProfilesRepository);
  });

  describe('calls createProfile', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      profilesRepository.createProfile.mockResolvedValue(mockProfile);

      expect(await profilesService.createProfile(mockCreateProfileDto)).toEqual(
        mockProfile,
      );
    });
  });

  describe('calls getProfileByUserId', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      profilesRepository.getProfileByUserId.mockResolvedValue(mockProfile);

      const result = await profilesService.getProfileByUserId(
        '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
      );

      expect(result).toEqual(mockProfile);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      profilesRepository.getProfileByUserId.mockResolvedValue(null);

      expect(
        profilesService.getProfileByUserId(
          '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
