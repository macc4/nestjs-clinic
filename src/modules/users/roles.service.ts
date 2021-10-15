import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RolesRepository } from './roles.repository';

Injectable();
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
  ) {}

  //
  // Get role by title
  //

  async getRoleByTitle(title: string): Promise<Role> {
    const role = await this.rolesRepository.getRoleByTitle(title);

    return role;
  }
}
