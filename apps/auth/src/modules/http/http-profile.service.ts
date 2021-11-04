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

  private readonly defaultHost = '127.0.0.1';
  private readonly port = this.configService.get('PROFILE_SERVICE_PORT');

  getServiceURI() {
    const dockerHost = this.configService.get('PROFILE_SERVICE_HOST');

    let URI: string;

    if (dockerHost) {
      URI = `http://${dockerHost}:${this.port}/profiles`;
    } else {
      URI = `http://${this.defaultHost}:${this.port}/profiles`;
    }

    return URI;
  }

  async createProfile(createProfileDto: CreateProfileDto): Promise<void> {
    const URI = this.getServiceURI();

    try {
      this.httpService.post(URI, createProfileDto).subscribe();
    } catch (error) {
      console.log(error);
    }
  }
}
