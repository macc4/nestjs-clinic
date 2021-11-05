import {
  Brackets,
  EntityManager,
  EntityRepository,
  getManager,
  Repository,
} from 'typeorm';
import { Patient } from '../patients/entities/patient.entity';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './entities/resolution.entity';
import { Doctor } from '../doctors/entities/doctor.entity';
import { GetUserDto } from '@macc4-clinic/common';
import { PatchResolutionDto } from './dto/patch-resolution.dto';

@EntityRepository(Resolution)
export class ResolutionsRepository extends Repository<Resolution> {
  constructor(private readonly pool: EntityManager = getManager()) {
    super();
  }
  //
  // Create a new resolution
  //

  async createResolution(
    createResolutionDto: CreateResolutionDto,
    patient: Patient,
    doctor: Doctor,
  ): Promise<Resolution> {
    const resolution = this.create({
      doctor,
      text: createResolutionDto.text,
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
      query.andWhere('resolution.patient_id = :patientId', { patientId });
    }

    if (doctorId) {
      query.andWhere('resolution.doctor_id = :doctorId', { doctorId });
    }

    const resolutions = await query.getMany();

    return resolutions;
  }

  //
  // Get personal resolutions
  //

  async getMyResolutions(user: GetUserDto): Promise<Resolution[]> {
    const query = `
    SELECT resolutions.*
    FROM clinic.resolutions
    INNER JOIN clinic.patients
      ON patients.id = resolutions.patient_id
    WHERE patients.user_id='${user.id}';
    `;

    const resolution = await this.pool.query(query);

    return resolution;
  }

  //
  // Get resolution by id
  //

  async getResolutionById(id: number): Promise<Resolution> {
    const resolution = await this.findOne(id);

    return resolution;
  }

  //
  // Get resolution by id
  //

  async patchResolutionById(
    id: number,
    patchResolutionDto: PatchResolutionDto,
  ): Promise<Resolution> {
    const { text } = patchResolutionDto;

    const resolution = await this.findOne(id);

    resolution.text = text;

    return this.save(resolution);
  }

  //
  // Delete resolution by id
  //

  async deleteResolutionById(id: number): Promise<number> {
    const resolution = await this.delete(id);

    return resolution.affected;
  }
}
