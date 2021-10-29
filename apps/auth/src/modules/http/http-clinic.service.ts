import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpClinicService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly host = 'http://127.0.0.1';
  private readonly API_URI = `${this.host}:${this.configService.get(
    'CLINIC_SERVICE_PORT',
  )}`;

  async createPatient(userId: string): Promise<void> {
    const URI = `${this.API_URI}/patients`;

    try {
      this.httpService.post(URI, { userId }).subscribe();
    } catch (error) {
      console.log(error);
    }
  }
}
