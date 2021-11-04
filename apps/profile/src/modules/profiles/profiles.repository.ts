import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { Profile } from './entities/profile.entity';

@EntityRepository(Profile)
export class ProfilesRepository extends Repository<Profile> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }
  //
  // Create a new profile
  //

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { name, gender, userId } = createProfileDto;

    const profile = this.create({
      name,
      gender,
      user_id: userId,
    });

    await this.save(profile);

    return profile;
  }

  //
  // Get profile by user ID
  //

  async getProfileByUserId(userId: string): Promise<Profile> {
    const query = `SELECT *
    FROM profile
    WHERE profile.userId="${userId}"`;

    const [profile] = await this.pool.query(query);

    return profile;
  }
}
