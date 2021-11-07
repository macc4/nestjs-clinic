import { GetUserDto } from '@macc4-clinic/common';
import {
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { PatchProfileDto } from './dto/patch-profile.dto';
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
    FROM profile.profiles
    WHERE profiles.user_id = '${userId}'`;

    const [profile] = await this.pool.query(query);

    return profile;
  }

  //
  // Get profile by user ID
  //

  async getBatchProfiles(userIds: string[]): Promise<Profile[]> {
    const query = `SELECT *
    FROM profile.profiles
    WHERE profiles.user_id = ANY($1::uuid[]);
    `;

    const profiles = await this.pool.query(query, [userIds]);

    return profiles;
  }

  async patchPersonalProfile(
    user: GetUserDto,
    patchProfileDto: PatchProfileDto,
  ): Promise<Profile> {
    const { name } = patchProfileDto;

    const profile = await this.findOne({ user_id: user.id });

    profile.name = name;

    return this.save(profile);
  }
}
