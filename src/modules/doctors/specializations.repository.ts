import { EntityRepository, Repository } from 'typeorm';
import { Specialization } from './entities/specialization.entity';

@EntityRepository(Specialization)
export class SpecializationsRepository extends Repository<Specialization> {
  //
  // Get specialization by title
  //

  async getSpecializationByTitle(title: string): Promise<Specialization> {
    return await this.findOne({ title });
  }
}
