import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserNotFoundByEmailException } from './errors/UserNotFoundByEmailException.error';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';
import { RolesService } from './roles.service';
import { UserRole } from '@macc4-clinic/common';
import { HttpClinicService } from '../http/http-clinic.service';
import { HttpProfileService } from '../http/http-profile.service';

Injectable();
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private readonly rolesService: RolesService,
    private readonly httpClinicService: HttpClinicService,
    private readonly httpProfileService: HttpProfileService,
  ) {}

  //
  // Create user
  //

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, gender, roles } = createUserDto;

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
      this.httpClinicService.createPatient(user.id);
    }

    this.httpProfileService.createProfile({ userId: user.id, name, gender });

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
}
