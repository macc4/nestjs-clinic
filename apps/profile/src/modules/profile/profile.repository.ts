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
import { snakeToCamel } from '@macc4-clinic/common';

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }
  //
  // Create a new profile
  //

  async createProfile(createProfileDto: CreateProfileDto): Promise<Profile> {
    const { firstName, lastName, gender, birthDate, userId } = createProfileDto;

    const profile = this.create({
      firstName,
      lastName,
      gender,
      birthDate,
      userId,
    });

    await this.save(profile);

    return snakeToCamel(profile);
  }

  //
  // Get profile by user ID
  //

  async getProfileByUserId(userId: string): Promise<Profile> {
    const query = `SELECT *
    FROM profile.profiles
    WHERE profiles.user_id = '${userId}'`;

    const [profile] = await this.pool.query(query);


    return snakeToCamel(profile);
  }

  //
  // Get profile by user ID
  //

  async getBatchProfiles(userIds: string[]): Promise<Profile[]> {
    const query = `SELECT *
    FROM profile.profiles
    WHERE profiles.user_id = ANY($1::uuid[]);
    `;

    const profiles = (await this.pool.query(query, [userIds])).map((profile) =>
      snakeToCamel(profile),
    );

    return profiles;
  }

  async patchPersonalProfile(
    user: GetUserDto,
    patchProfileDto: PatchProfileDto,
  ): Promise<Profile> {
    const { firstName, lastName, avatarUrl } = patchProfileDto;

    const profile = await this.findOne({ userId: user.id });
    profile.firstName = firstName;
    profile.lastName = lastName;
    profile.avatarUrl = avatarUrl;

    this.save(profile);

    return snakeToCamel(profile);
  }
}
