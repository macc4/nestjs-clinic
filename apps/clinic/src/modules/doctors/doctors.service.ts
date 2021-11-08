import { GetUserDto } from '@macc4-clinic/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsRepository } from './doctors.repository';
import { GetDoctorsQueryDto } from './dto/get-doctors-query.dto';
import { Doctor } from './entities/doctor.entity';
import { SpecializationsService } from './specializations.service';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private readonly doctorsRepository: DoctorsRepository,
    private readonly specializationsService: SpecializationsService,
  ) {}

  //
  // Get Doctors (with optional filters)
  //

  async getDoctors(filters?: GetDoctorsQueryDto): Promise<Doctor[]> {
    const doctor = await this.doctorsRepository.getDoctors(filters);

    if (!doctor) {
      throw new NotFoundException(`No doctors found`);
    }

    return doctor;
  }

  //
  // Get Doctor by id
  //

  async getDoctorById(id: number): Promise<Doctor> {
    const doctor = await this.doctorsRepository.getDoctorById(id);

    if (!doctor) {
      throw new NotFoundException(`No doctor found with ID: ${id}`);
    }

    return doctor;
  }

  //
  // Get Doctor by User id
  //

  async getDoctorByUserId(userId: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.getDoctorByUserId(userId);

    if (!doctor) {
      throw new NotFoundException(`No doctor found with user ID: ${userId}`);
    }

    return doctor;
  }

  //
  // Get the personal Doctor profile
  //

  async getMyDoctorProfile(user: GetUserDto): Promise<Doctor> {
    const doctor = await this.getDoctorByUserId(user.id);

    return doctor;
  }
}
