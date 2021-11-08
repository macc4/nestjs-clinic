import { EntityRepository, Repository } from 'typeorm';
import { Specialization } from './entities/specialization.entity';

@EntityRepository(Specialization)
export class SpecializationsRepository extends Repository<Specialization> {
  //
  // Get all Specializations
  //

  async getSpecializations(): Promise<Specialization[]> {
    return await this.find();
  }

  //
  // Get Specialization by title (not used due to seeding of the data)
  //

  async getSpecializationByTitle(title: string): Promise<Specialization> {
    return await this.findOne({ title });
  }
}
