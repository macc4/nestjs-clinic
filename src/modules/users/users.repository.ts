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
    return await this.findOne({ email });
  }

  async getUserById(id: string): Promise<User> {
    const query = `
    SELECT user.id, user.email, role.title as roles,
    (SELECT patient.id from patient WHERE patient.userId = user.id) as patientId,
    (SELECT doctor.id from doctor WHERE doctor.userId = user.id) as doctorId
    FROM user
    LEFT OUTER JOIN
      (
        user_roles_role us_rl
          INNER JOIN role ON us_rl.roleId=role.id
      )
      ON user.id=us_rl.userId
    WHERE user.id="${id}"`;

    return await this.pool.query(query);
  }
}
