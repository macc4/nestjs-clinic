import { snakeToCamel } from '@macc4-clinic/common';
import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { Role } from './entities/role.entity';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }
  //
  // Get role by title
  //

  async getRoleByTitle(title: string): Promise<Role> {
    const role = await this.findOne({ title });

    return snakeToCamel(role);
  }
}
