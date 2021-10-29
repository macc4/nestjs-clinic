import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class HttpProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly host = 'http://127.0.0.1';
  private readonly API_URI = `${this.host}:${this.configService.get(
    'PROFILE_SERVICE_PORT',
  )}`;

  async createProfile(createProfileDto: CreateProfileDto): Promise<void> {
    const URI = `${this.API_URI}/profiles`;

    try {
      this.httpService.post(URI, createProfileDto).subscribe();
    } catch (error) {
      console.log(error);
    }
  }
}
