import { Injectable } from '@nestjs/common';
import { DEFAULT_REDIS_NAMESPACE, InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { DoctorsService } from '../doctors/doctors.service';
import { GetUserDto } from '../common/dto/get-user.dto';
import { EmptyQueueException } from './errors/EmptyQueueException.error';
import { PatientsService } from '../patients/patients.service';

Injectable();
export class QueueService {
  private readonly prefix = 'queue';

  constructor(
    @InjectRedis(DEFAULT_REDIS_NAMESPACE) private readonly redisClient: Redis,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientsService,
  ) {}

  async enqueueAsPatient(
    doctorId: number,
    user: GetUserDto,
  ): Promise<{ message: string }> {
    await this.doctorsService.getDoctorById(doctorId);

    const patient = await this.patientsService.getPatientByUserId(user.id);

    const numberInQueue = await this.redisClient.rpush(
      `${this.prefix}:${doctorId}`,
      `${patient.id}`,
    );

    return { message: `You are ${numberInQueue} in the queue` };
  }

  async peekAsPatient(doctorId: number): Promise<string> {
    await this.doctorsService.getDoctorById(doctorId);

    const patientId = await this.redisClient.lindex(
      `${this.prefix}:${doctorId}`,
      0,
    );

    if (!patientId) {
      throw new EmptyQueueException(doctorId);
    }

    return patientId;
  }

  async peekAsDoctor(user: GetUserDto): Promise<string> {
    const doctor = await this.doctorsService.getDoctorByUserId(user.id);

    const patientId = await this.redisClient.lindex(
      `${this.prefix}:${doctor.id}`,
      0,
    );

    if (!patientId) {
      throw new EmptyQueueException(doctor.id);
    }

    return patientId;
  }

  async dequeueAsDoctor(user: GetUserDto) {
    const doctor = await this.doctorsService.getDoctorByUserId(user.id);

    const patientId = await this.redisClient.lpop(
      `${this.prefix}:${doctor.id}`,
    );

    if (!patientId) {
      throw new EmptyQueueException(doctor.id);
    }
  }
}
