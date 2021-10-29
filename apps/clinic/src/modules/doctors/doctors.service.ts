import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsRepository } from './doctors.repository';
import { Doctor } from './entities/doctor.entity';
import { SpecializationsService } from './specializations.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private doctorsRepository: DoctorsRepository,
    private specializationsService: SpecializationsService,
  ) {}

  //
  // Get doctor by ID
  //

  async getDoctorById(id: number): Promise<Doctor> {
    const doctor = await this.doctorsRepository.getDoctorById(id);

    if (!doctor) {
      throw new NotFoundException(`No doctor found with ID: ${id}`);
    }

    return doctor;
  }

  //
  // Get doctor by user ID
  //

  async getDoctorByUserId(userId: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.getDoctorByUserId(userId);

    if (!doctor) {
      throw new NotFoundException(`No doctor found with user ID: ${userId}`);
    }

    return doctor;
  }
}
