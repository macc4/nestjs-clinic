import { Brackets, EntityRepository, Repository } from 'typeorm';
import { Patient } from '../patients/patient.entity';
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
    patient: Patient,
  ): Promise<Resolution> {
    const { doctorId, text } = createResolutionDto;

    const resolution = this.create({
      doctor_id: doctorId,
      text,
      expiry: createResolutionDto.expiryDate,
      patient,
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
      query.andWhere('resolution.doctor_id = :doctorId', { doctorId });
    }

    query.andWhere(
      new Brackets((qb) => {
        qb.where('resolution.expiry IS NULL').orWhere(
          'resolution.expiry > Now()',
        );
      }),
    );

    const resolutions = await query.getMany();

    return resolutions;
  }

  //
  // Get resolution by id
  //

  async getResolutionById(id: number): Promise<Resolution> {
    const resolution = await this.findOne(id);

    return resolution;
  }

  //
  // Delete resolution by id
  //

  async deleteResolutionById(id: number): Promise<number> {
    const resolution = await this.delete(id);

    return resolution.affected;
  }
}
