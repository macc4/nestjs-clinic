import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }
  async createUser(createUserDto: CreateUserDto, roles: Role[]): Promise<User> {
    const { email, hashedPassword } = createUserDto;

    const user = this.create({
      email,
      password: hashedPassword,
      roles,
    });

    await this.save(user);

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return await this.findOne({ relations: ['roles'], where: { email } });
  }
}
