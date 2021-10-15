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

const mockSignUpDto = new SignUpDto();
const mockSignInDto = new SignInDto();
const mockUser = new User();

describe('UsersService', () => {
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
          useValue: { createUser: jest.fn(), getUserByEmail: jest.fn() },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    usersService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('calls signUp', () => {
    it('and returns the token', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(undefined);

      const bcryptHash = jest.fn().mockResolvedValue('hashedpassword');
      (bcrypt.hash as jest.Mock) = bcryptHash;

      usersService.createUser.mockResolvedValue(mockUser);

      (jwtService.sign as jest.Mock).mockReturnValue('jwt-token');

      const result = await authService.signUp(mockSignUpDto);

      expect(usersService.getUserByEmail).toBeCalledWith(mockSignUpDto.email);
      expect(result).toEqual({ token: 'jwt-token' });
    });

    it('and throws an error if duplicate email', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(mockUser);

      expect(usersService.createUser).toHaveBeenCalledTimes(0);
      expect(authService.signUp(mockSignUpDto)).rejects.toThrow(
        EmailConflictException,
      );
    });
  });

  describe('calls signIn', () => {
    it('and returns the token', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      (jwtService.sign as jest.Mock).mockReturnValue('jwt-token');

      const result = await authService.signIn(mockSignInDto);

      expect(jwtService.sign).toHaveBeenCalledTimes(1);
      expect(result).toEqual({ token: 'jwt-token' });
    });

    it('and throws an error if no user found with this email', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(undefined);

      expect(jwtService.sign).toHaveBeenCalledTimes(0);
      expect(authService.signIn(mockSignInDto)).rejects.toThrow(
        IncorrectEmailOrPassException,
      );
    });

    it('and throws an error if passwords do not match', async () => {
      expect.assertions(2);

      usersService.getUserByEmail.mockResolvedValue(mockUser);

      const bcryptCompare = jest.fn().mockResolvedValue(false);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      expect(jwtService.sign).toHaveBeenCalledTimes(0);
      expect(authService.signIn(mockSignInDto)).rejects.toThrow(
        IncorrectEmailOrPassException,
      );
    });
  });
});
