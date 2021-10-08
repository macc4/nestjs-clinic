import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from './dto/CreatePatient.dto';
import { Patient } from './patient.entity';
import { PatientsRepository } from './patients.repository';

Injectable();
export class PatientsService {
  constructor(
    @InjectRepository(PatientsRepository)
    private patientsRepository: PatientsRepository,
  ) {}

  //
  // Create a new patient
  //

  async createPatient(createPatientDto: CreatePatientDto): Promise<Patient> {
    return this.patientsRepository.createPatient(createPatientDto);
  }

  //
  // Get patient by ID
  //

  async getPatientById(id: number): Promise<Patient> {
    const patient = await this.patientsRepository.getPatientById(id);

    if (!patient) {
      throw new NotFoundException(`No patient found with ID "${id}""`);
    }

    return patient;
  }
}
