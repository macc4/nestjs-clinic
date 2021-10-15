import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientsService } from '../patients/patients.service';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { GetResolutionsFilterDto } from './dto/get-resolutions-filter.dto';
import { Resolution } from './entities/resolution.entity';
import { ResolutionsRepository } from './resolutions.repository';
import { DoctorsService } from '../doctors/doctors.service';
import { GetUserDto } from '../auth/dto/get-user.dto';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private resolutionsRepository: ResolutionsRepository,
    private patientsService: PatientsService,
    private doctorsService: DoctorsService,
  ) {}

  //
  // Create a new resolution
  //

  async createResolution(
    createResolutionDto: CreateResolutionDto,
    user: GetUserDto,
  ): Promise<Resolution> {
    const patient = await this.patientsService.getPatientById(
      createResolutionDto.patientId,
    );

    const doctor = await this.doctorsService.getDoctorById(user.doctorId);

    return this.resolutionsRepository.createResolution(
      createResolutionDto,
      patient,
      doctor,
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

  async getMyResolutions(user: GetUserDto): Promise<Resolution[]> {
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
