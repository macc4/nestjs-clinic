import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HttpClinicService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly defaultHost = '127.0.0.1';
  private readonly port = this.configService.get('CLINIC_SERVICE_PORT');

  private getServiceURI() {
    const dockerHost = this.configService.get('CLINIC_SERVICE_HOST');

    let URI: string;

    if (dockerHost) {
      URI = `http://${dockerHost}:${this.port}/patients`;
    } else {
      URI = `http://${this.defaultHost}:${this.port}/patients`;
    }

    return URI;
  }

  async createPatient(userId: string): Promise<void> {
    const URI = this.getServiceURI();

    try {
      this.httpService.post(URI, { userId }).subscribe();
    } catch (error) {
      console.log(error);
    }
  }
}
