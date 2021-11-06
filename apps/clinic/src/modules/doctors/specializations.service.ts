import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialization } from './entities/specialization.entity';
import { SpecializationsRepository } from './specializations.repository';

Injectable();
export class SpecializationsService {
  constructor(
    @InjectRepository(SpecializationsRepository)
    private specializationsRepository: SpecializationsRepository,
  ) {}

  //
  // Get all Specializations
  //
  async getSpecializations(): Promise<Specialization[]> {
    const specializations =
      await this.specializationsRepository.getSpecializations();

    return specializations;
  }

  //
  // Get specialization by title (not used due to seeding of the data)
  //

  async getSpecializationByTitle(title: string): Promise<Specialization> {
    const specialization =
      await this.specializationsRepository.getSpecializationByTitle(title);

    return specialization;
  }
}
