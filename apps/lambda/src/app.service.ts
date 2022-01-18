import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async getParametersFromSsmAndLog(): Promise<string> {
    console.log('\n');
    console.log(this.configService.get('TEST_PARAMETER'));
    console.log('\n');

    const returnString = `Hello from Lambda! SSM TEST_PARAMETER: \n ${this.configService.get(
      'TEST_PARAMETER',
    )}`;

    return returnString;
  }
}
