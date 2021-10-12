import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';

Injectable();
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  //
  // Create user
  //

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  //
  // Get user by email
  //

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user) {
      throw new UserNotFoundByEmailException();
    }

    return user;
  }
}
