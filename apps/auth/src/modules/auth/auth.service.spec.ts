import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { EmailConflictException } from './errors/EmailConflictException.error';
import { SignInDto } from './dto/sign-in.dto';
import { IncorrectEmailOrPassException } from './errors/IncorrectEmailOrPass.error';
import { GetUserDto, UserRole } from '@macc4-clinic/common';
import { Role } from '../users/entities/role.entity';
import { ChangePasswordDto } from './dto/changePassword.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

const mockSignUpDto = new SignUpDto();
const mockSignInDto = new SignInDto();
const mockChangePasswordDto = new ChangePasswordDto();
const mockGetUserDto = new GetUserDto();
const mockUser = new User();
const mockRole = new Role();
mockUser.roles = [mockRole];

describe('AuthService', () => {
  let authService: AuthService;
  let usersService: any;
  let jwtService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            getUserByEmail: jest.fn(),
            getUserById: jest.fn(),
            setPassword: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('calls signUp', () => {
    it('and returns the token', async () => {
      expect.assertions(3);

      usersService.getUserByEmail.mockResolvedValue(undefined);

      const bcryptHash = jest.fn().mockResolvedValue('hashedpassword');
      (bcrypt.hash as jest.Mock) = bcryptHash;

      usersService.createUser.mockResolvedValue(mockUser);

      (jwtService.sign as jest.Mock).mockReturnValue('jwt-token');

      expect(await authService.signUp(mockSignUpDto)).toEqual({
        token: 'jwt-token',
      });
      expect(usersService.getUserByEmail).toBeCalledWith(mockSignUpDto.email);
      expect(jwtService.sign).toBeCalledWith({
        id: mockUser.id,
        roles: [UserRole.PATIENT],
      });
    });

    it('and throws an error if duplicate email', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(mockUser);

      await expect(authService.signUp(mockSignUpDto)).rejects.toThrow(
        EmailConflictException,
      );
      expect(usersService.createUser).toHaveBeenCalledTimes(0);
    });
  });

  describe('calls signIn', () => {
    it('and returns the token', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      (jwtService.sign as jest.Mock).mockReturnValue('jwt-token');

      expect(await authService.signIn(mockSignInDto)).toEqual({
        token: 'jwt-token',
      });
      expect(jwtService.sign).toHaveBeenCalledTimes(1);
    });

    it('and throws an error if passwords do not match', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      await expect(authService.signIn(mockSignInDto)).rejects.toThrow(
        IncorrectEmailOrPassException,
      );
      expect(jwtService.sign).toHaveBeenCalledTimes(0);
    });
  });

  describe('calls changePassword', () => {
    it('and returns nothing if successful', async () => {
      expect.assertions(4);

      usersService.getUserById.mockResolvedValue(mockUser);

      const bcryptCompare = jest
        .fn()
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      const bcryptHash = jest.fn().mockResolvedValue('hashedpassword');
      (bcrypt.hash as jest.Mock) = bcryptHash;

      expect(
        await authService.changePassword(mockGetUserDto, mockChangePasswordDto),
      ).toBeUndefined();
      expect(bcrypt.compare).toHaveBeenCalledTimes(2);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(usersService.setPassword).toHaveBeenCalledWith(
        mockGetUserDto.id,
        'hashedpassword',
      );
    });

    it('and throws an error if the old password was entered incorrectly', async () => {
      expect.assertions(3);

      usersService.getUserById.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValueOnce(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      await expect(
        authService.changePassword(mockGetUserDto, mockChangePasswordDto),
      ).rejects.toThrow(BadRequestException);
      expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      expect(usersService.setPassword).toHaveBeenCalledTimes(0);
    });

    it('and throws an error if the new password equals to the old one', async () => {
      expect.assertions(3);

      usersService.getUserById.mockResolvedValue(mockUser);

      const bcryptCompare = jest
        .fn()
        .mockResolvedValueOnce(true)
        .mockResolvedValueOnce(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      await expect(
        authService.changePassword(mockGetUserDto, mockChangePasswordDto),
      ).rejects.toThrow(BadRequestException);
      expect(bcrypt.compare).toHaveBeenCalledTimes(2);
      expect(usersService.setPassword).toHaveBeenCalledTimes(0);
    });
  });
});
