import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Redis } from 'ioredis';
import { User } from '../users/user.entity';
import { PatientsService } from '../patients/patients.service';

Injectable();
export class QueueService {
  private readonly prefix = 'queue';

  constructor(
    @InjectRedis() private readonly redisClient: Redis,
    private readonly patientsService: PatientsService,
  ) {}

  async enqueue(user: User): Promise<number> {
    const patient = await this.patientsService.getPatientByUserId(user.id);

    return await this.redisClient.rpush(`${this.prefix}`, `${patient.id}`);
  }

  async peek(): Promise<string> {
    return await this.redisClient.lindex(`${this.prefix}`, 0);
  }

  async dequeue() {
    const patientId = await this.redisClient.lpop(`${this.prefix}`);

    if (!patientId) {
      throw new NotFoundException('Queue is empty');
    }
  }
}
