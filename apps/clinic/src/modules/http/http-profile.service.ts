import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { GetBatchProfilesDto } from './dto/get-batch-profiles.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class HttpProfileService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly defaultHost = '127.0.0.1';
  private readonly port = this.configService.get('PROFILE_SERVICE_PORT');

  private getServiceURI() {
    const dockerHost = this.configService.get('PROFILE_SERVICE_HOST');

    let URI: string;

    if (dockerHost) {
      URI = `http://${dockerHost}:${this.port}/profiles`;
    } else {
      URI = `http://${this.defaultHost}:${this.port}/profiles`;
    }

    return URI;
  }

  async getBatchProfiles(data: GetBatchProfilesDto) {
    const URI = `${this.getServiceURI()}/batch?userIds=${JSON.stringify(
      data.userIds,
    )}`;

    try {
      const response = await lastValueFrom(this.httpService.get(URI));

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
}
