import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PatientsService } from '../patients/patients.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './enums/user-role.enum';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { RolesService } from './roles.service';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const mockUser = new User();

const mockCreateUserDto = new CreateUserDto();
mockCreateUserDto.roles = [UserRole.PATIENT];

describe('UsersService', () => {
  let usersService: UsersService;
  let patientsService: any;
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
          },
        },
        {
          provide: PatientsService,
          useValue: { createPatient: jest.fn() },
        },
        {
          provide: RolesService,
          useValue: { getRoleByTitle: jest.fn() },
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    patientsService = module.get(PatientsService);
    rolesService = module.get(RolesService);
    usersRepository = module.get(UsersRepository);
  });

  describe('calls createUser', () => {
    it('and returns the data', async () => {
      expect.assertions(3);

      usersRepository.createUser.mockResolvedValue(mockUser);

      const result = await usersService.createUser(mockCreateUserDto);

      expect(rolesService.getRoleByTitle).toBeCalledWith(
        mockCreateUserDto.roles[0],
      );
      expect(patientsService.createPatient).toBeCalledWith({
        name: mockCreateUserDto.name,
        gender: mockCreateUserDto.gender,
        user: mockUser,
      });
      expect(result).toEqual(mockUser);
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

      expect(usersService.getUserByEmail('test@email.com')).rejects.toThrow(
        UserNotFoundByEmailException,
      );
    });
  });

  describe('calls getUserById', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      usersRepository.getUserById.mockResolvedValue(mockUser);

      const result = await usersService.getUserById(
        '3a3aaf37-8efa-4f62-a62f-07adf8d5c421',
      );

      expect(result).toEqual(mockUser);
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      usersRepository.getUserById.mockResolvedValue(null);

      expect(usersService.getUserById('test@email.com')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
