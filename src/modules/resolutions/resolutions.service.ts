import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/users/user.entity';
import { PatientsService } from '../patients/patients.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './resolution.entity';
import { ResolutionsRepository } from './resolutions.repository';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private resolutionsRepository: ResolutionsRepository,
    private patientsService: PatientsService,
  ) {}

  //
  // Create a new resolution
  //

  async createResolution(
    createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    const patient = await this.patientsService.getPatientById(
      createResolutionDto.patientId,
    );

    return this.resolutionsRepository.createResolution(
      createResolutionDto,
      patient,
    );
  }

  //
  // Get all resolutions with an optional query
  //

  async getResolutions(
    filterDto: GetResolutionsFilterDto,
  ): Promise<Resolution[]> {
    return this.resolutionsRepository.getResolutions(filterDto);
  }

  //
  // Get personal resolutions
  //

  async getMyResolutions(user: User): Promise<Resolution[]> {
    const resolution = await this.resolutionsRepository.getMyResolutions(user);

    return resolution;
  }

  //
  // Get resolution by id
  //

  async getResolutionById(id: number): Promise<Resolution> {
    const resolution = await this.resolutionsRepository.getResolutionById(id);

    if (!resolution) {
      throw new NotFoundException(`No resolution found with ID: ${id}`);
    }

    return resolution;
  }

  //
  // Delete resolution by id
  //

  async deleteResolutionById(id: number): Promise<void> {
    const resolution = await this.resolutionsRepository.deleteResolutionById(
      id,
    );

    if (!resolution) {
      throw new NotFoundException(`No resolution found with ID: ${id}`);
    }
  }
}
