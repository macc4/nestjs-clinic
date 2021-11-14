import { EntityRepository, Repository } from 'typeorm';
import { Specialization } from './entities/specialization.entity';

@EntityRepository(Specialization)
export class SpecializationsRepository extends Repository<Specialization> {
  //
  // Get all Specializations
  //

  async getSpecializations(): Promise<Specialization[]> {
    const specializations = await this.find();

    return specializations;
  }

  //
  // Get Specialization by title (not used due to seeding of the data)
  //

  async getSpecializationByTitle(title: string): Promise<Specialization> {
    const specialization = await this.findOne({ title });

    return specialization;
  }
}
