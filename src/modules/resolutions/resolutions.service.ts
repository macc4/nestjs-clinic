import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './resolution.entity';
import { ResolutionsRepository } from './resolutions.repository';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private resolutionsRepository: ResolutionsRepository,
  ) {}

  //
  // Create a new resolution
  //

  async createResolution(
    createResolutionDto: CreateResolutionDto,
  ): Promise<Resolution> {
    return this.resolutionsRepository.createResolution(createResolutionDto);
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
  // Get resolution by id
  //

  async getResolution(id: number): Promise<Resolution> {
    const resolution = await this.resolutionsRepository.getResolution(id);

    if (!resolution) {
      throw new NotFoundException();
    }

    return resolution;
  }

  //
  // Delete resolution by id
  //

  async deleteResolution(id: number): Promise<void> {
    const resolution = await this.resolutionsRepository.deleteResolution(id);

    if (!resolution) {
      throw new NotFoundException();
    }
  }
}
