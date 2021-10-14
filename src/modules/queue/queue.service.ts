import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { DoctorsService } from '../doctors/doctors.service';
import { GetUserDto } from '../auth/dto/get-user.dto';
import { EmptyQueueException } from './errors/EmptyQueueException.error';

Injectable();
export class QueueService {
  private readonly prefix = 'queue';

  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private readonly doctorsService: DoctorsService,
  ) {}

  async enqueueAsPatient(
    doctorId: number,
    user: GetUserDto,
  ): Promise<{ message: string }> {
    await this.doctorsService.getDoctorById(doctorId);

    const numberInQueue = await this.redisClient.rpush(
      `${this.prefix}:${doctorId}`,
      `${user.patientId}`,
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
    const patientId = await this.redisClient.lindex(
      `${this.prefix}:${user.doctorId}`,
      0,
    );

    if (!patientId) {
      throw new EmptyQueueException(user.doctorId);
    }

    return patientId;
  }

  async dequeueAsDoctor(user: GetUserDto) {
    const patientId = await this.redisClient.lpop(
      `${this.prefix}:${user.doctorId}`,
    );

    if (!patientId) {
      throw new EmptyQueueException(user.doctorId);
    }
  }
}
