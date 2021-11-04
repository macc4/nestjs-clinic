import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { RolesService } from './roles.service';
import { PatientsService } from '../patients/patients.service';
import { UserRole } from './enums/user-role.enum';

Injectable();
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private patientsService: PatientsService,
    private rolesService: RolesService,
  ) {}

  //
  // Create user
  //

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { roles } = createUserDto;

    const roleEntitiesArray = await Promise.all(
      roles.map(async (roleTitle) => {
        return await this.rolesService.getRoleByTitle(roleTitle);
      }),
    );

    const user = await this.usersRepository.createUser(
      createUserDto,
      roleEntitiesArray,
    );

    if (roles.includes(UserRole.PATIENT)) {
      await this.patientsService.createPatient({
        name: createUserDto.name,
        gender: createUserDto.gender,
        user,
      });
    }

    return user;
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

  //
  // Get user by email
  //

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`No user found with ID: ${id}`);
    }

    return user;
  }
}
