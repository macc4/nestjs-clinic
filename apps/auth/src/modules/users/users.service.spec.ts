import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from '@macc4-clinic/common';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { ClinicService } from '../grpc/grpc-clinic.service';
import { ProfileService } from '../grpc/grpc-profile.service';
import { NotFoundException } from '@nestjs/common';

const mockUser = new User();

const mockCreateUserDto = new CreateUserDto();
mockCreateUserDto.roles = [UserRole.PATIENT];

describe('UsersService', () => {
  let usersService: UsersService;
  let clinicService: any;
  let profileService: any;
  let rolesService: any;
  let usersRepository: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: {
            createUser: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserById: jest.fn(),
            setPassword: jest.fn(),
          },
        },
        {
          provide: RolesService,
          useValue: { getRoleByTitle: jest.fn() },
        },
        {
          provide: ClinicService,
          useValue: { createPatient: jest.fn() },
        },
        {
          provide: ProfileService,
          useValue: { createProfile: jest.fn() },
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
    rolesService = module.get(RolesService);
    clinicService = module.get(ClinicService);
    profileService = module.get(ProfileService);
  });

  describe('calls createUser', () => {
    it('returns the data', async () => {
      expect.assertions(4);

      usersRepository.createUser.mockResolvedValue(mockUser);

      expect(await usersService.createUser(mockCreateUserDto)).toEqual(
        mockUser,
      );
      expect(rolesService.getRoleByTitle).toBeCalledWith(
        mockCreateUserDto.roles[0],
      );
      expect(clinicService.createPatient).toBeCalledWith({
        userId: mockUser.id,
      });
      expect(profileService.createProfile).toBeCalledWith({
        userId: mockUser.id,
        firstName: mockCreateUserDto.firstName,
        lastName: mockCreateUserDto.lastName,
        gender: mockCreateUserDto.gender,
        birthDate: mockCreateUserDto.birthDate,
      });
    });
  });

  describe('calls setPassword', () => {
    it('returns nothing if successful', async () => {
      expect.assertions(1);

      usersRepository.setPassword.mockResolvedValue(undefined);

      expect(
        await usersService.setPassword(
          '65c7bf31-c24d-42c8-bd4f-1ceee57496b2',
          'hashedpassword',
        ),
      ).toEqual(undefined);
    });
  });

  describe('calls getUserByEmail', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      usersRepository.getUserByEmail.mockResolvedValue(mockUser);

      const result = await usersService.getUserByEmail('test@email.com');

      expect(result).toEqual(mockUser);
    });

    it('handles an error if no data found', async () => {
      expect.assertions(1);

      usersRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        usersService.getUserByEmail('test@email.com'),
      ).rejects.toThrow(UserNotFoundByEmailException);
    });
  });

  describe('calls getUserById', () => {
    it('returns the data', async () => {
      expect.assertions(1);

      usersRepository.getUserById.mockResolvedValue(mockUser);

      expect(
        await usersService.getUserById('65c7bf31-c24d-42c8-bd4f-1ceee57496b2'),
      ).toEqual(mockUser);
    });

    it('handles an error if no data found', async () => {
      expect.assertions(1);

      usersRepository.getUserById.mockResolvedValue(null);

      await expect(
        usersService.getUserById('65c7bf31-c24d-42c8-bd4f-1ceee57496b2'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
