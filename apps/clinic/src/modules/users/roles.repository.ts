import { EntityRepository, Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@EntityRepository(Role)
export class RolesRepository extends Repository<Role> {
  //
  // Get role by title
  //

  async getRoleByTitle(title: string): Promise<Role> {
    return await this.findOne({ title });
  }
}
