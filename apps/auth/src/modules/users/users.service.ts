import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { RolesService } from './roles.service';
import { UserRole } from '@macc4-clinic/common';
import { ClinicService } from '../grpc/grpc-clinic.service';
import { ProfileService } from '../grpc/grpc-profile.service';

Injectable();
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
    private readonly clinicService: ClinicService,
    private readonly profileService: ProfileService,
  ) {}

  //
  // Create user
  //

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { firstName, lastName, gender, birthDate, roles } = createUserDto;

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
      this.clinicService.createPatient({ userId: user.id });
    }

    this.profileService.createProfile({
      userId: user.id,
      firstName,
      lastName,
      gender,
      birthDate,
    });

    return user;
  }

  //
  // Set new User Password (move to the auth-service/auth-repository?)
  //

  async setPassword(userId: string, hashedPassword: string): Promise<void> {
    await this.usersRepository.setPassword(userId, hashedPassword);
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

  async getUserById(id: string): Promise<User> {
    const user = await this.usersRepository.getUserById(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }
}
