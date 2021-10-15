import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePatientDto } from './dto/create-patient.dto';
import { Patient } from './entities/patient.entity';
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
      throw new NotFoundException(`No patient found with ID: ${id}`);
    }

    return patient;
  }

  //
  // Get patient by user ID
  //

  async getPatientByUserId(userId: string): Promise<Patient> {
    const patient = await this.patientsRepository.getPatientByUserId(userId);

    if (!patient) {
      throw new NotFoundException(`No patient found with user ID: ${userId}`);
    }

    return patient;
  }
}
