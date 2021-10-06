import { EntityRepository, Repository } from 'typeorm';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './resolution.entity';

@EntityRepository(Resolution)
export class ResolutionsRepository extends Repository<Resolution> {
  //
  // Create a new resolution
  //

  async createResolution(
    createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    const { patientId, doctorId, text, expiry } = createResolutionDto;

    const resolution = this.create({
      patientId,
      doctorId,
      text,
      expiry,
    });

    await this.save(resolution);

    return resolution;
  }

  //
  // Get all resolutions with an optional query
  //

  async getResolutions(
    filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    const { patientId, doctorId } = filterDto;
    const query = this.createQueryBuilder('resolution');

    if (patientId) {
      query.andWhere('resolution.patientId = :patientId', { patientId });
    }

    if (doctorId) {
      query.andWhere('resolution.doctorId = :doctorId', { doctorId });
    }

    const resolutions = await query.getMany();

    return resolutions;
  }

  //
  // Get resolution by id
  //

  async getResolution(id: number): Promise<Resolution> {
    const resolution = await this.findOne(id);

    return resolution;
  }

  //
  // Delete resolution by id
  //

  async deleteResolution(id: number): Promise<number> {
    const resolution = await this.delete(id);

    return resolution.affected;
  }
}
