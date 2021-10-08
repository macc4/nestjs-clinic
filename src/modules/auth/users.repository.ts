import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRole } from './utils/user-role.enum';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(
    email: string,
    password: string,
    role: UserRole,
  ): Promise<User> {
    const user = this.create({
      email,
      password,
      role,
    });

    await this.save(user);

    return user;
  }
}
