import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;

    const user = this.create({
      email,
      password,
      role,
    });

    await this.save(user);

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({ email });
  }
}
