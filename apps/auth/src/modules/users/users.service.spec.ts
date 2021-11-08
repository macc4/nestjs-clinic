import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from '@macc4-clinic/common';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { HttpClinicService } from '../http/http-clinic.service';
import { HttpProfileService } from '../http/http-profile.service';
import { NotFoundException } from '@nestjs/common';

const mockUser = new User();

const mockCreateUserDto = new CreateUserDto();
mockCreateUserDto.roles = [UserRole.PATIENT];

describe('UsersService', () => {
  let usersService: UsersService;
  let httpClinicService: any;
  let httpProfileService: any;
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
          provide: HttpClinicService,
          useValue: { createPatient: jest.fn() },
        },
        {
          provide: HttpProfileService,
          useValue: { createProfile: jest.fn() },
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
    rolesService = module.get(RolesService);
    httpClinicService = module.get(HttpClinicService);
    httpProfileService = module.get(HttpProfileService);
  });

  describe('calls createUser', () => {
    it('and returns the data', async () => {
      expect.assertions(4);

      usersRepository.createUser.mockResolvedValue(mockUser);

      expect(await usersService.createUser(mockCreateUserDto)).toEqual(
        mockUser,
      );
      expect(rolesService.getRoleByTitle).toBeCalledWith(
        mockCreateUserDto.roles[0],
      );
      expect(httpClinicService.createPatient).toBeCalledWith(mockUser.id);
      expect(httpProfileService.createProfile).toBeCalledWith({
        userId: mockUser.id,
        name: mockCreateUserDto.name,
        gender: mockCreateUserDto.gender,
      });
    });
  });

  describe('calls setPassword', () => {
    it('and returns nothing if successful', async () => {
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
    it('and returns the data', async () => {
      expect.assertions(1);

      usersRepository.getUserByEmail.mockResolvedValue(mockUser);

      const result = await usersService.getUserByEmail('test@email.com');

      expect(result).toEqual(mockUser);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      usersRepository.getUserByEmail.mockResolvedValue(null);

      await expect(
        usersService.getUserByEmail('test@email.com'),
      ).rejects.toThrow(UserNotFoundByEmailException);
    });
  });

  describe('calls getUserById', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      usersRepository.getUserById.mockResolvedValue(mockUser);

      expect(
        await usersService.getUserById('65c7bf31-c24d-42c8-bd4f-1ceee57496b2'),
      ).toEqual(mockUser);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      usersRepository.getUserById.mockResolvedValue(null);

      await expect(
        usersService.getUserById('65c7bf31-c24d-42c8-bd4f-1ceee57496b2'),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
