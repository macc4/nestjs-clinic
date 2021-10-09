import { Test } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const mockUsersRepository = () => ({
  createUser: jest.fn(),
  getUserByEmail: jest.fn(),
});

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: mockUsersRepository,
        },
      ],
    }).compile();

    usersService = module.get(UsersService);
    usersRepository = module.get(UsersRepository);
  });

  describe('calls createUser', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      usersRepository.createUser.mockResolvedValue('data');

      const result = await usersService.createUser(new CreateUserDto());

      expect(result).toEqual('data');
    });
  });

  describe('calls getUserByEmail', () => {
    it('and returns the data', async () => {
      expect.assertions(1);

      usersRepository.getUserByEmail.mockResolvedValue('data');

      const result = await usersService.getUserByEmail('test@email.com');

      expect(result).toEqual('data');
    });

    it('and handles an error if no data found', async () => {
      expect.assertions(1);

      usersRepository.getUserByEmail.mockResolvedValue(null);

      expect(usersService.getUserByEmail('test@email.com')).rejects.toThrow(
        UserNotFoundByEmailException,
      );
    });
  });
});
