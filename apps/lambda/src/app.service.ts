import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

const ssmClient = new AWS.SSM({ region: 'eu-north-1' });

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  async getParametersFromSsmAndLog(): Promise<string> {
    // const ssmConfig = {};

    // const result = await ssmClient
    //   .getParametersByPath({
    //     Path: '/itrex/clinic/lambda/',
    //     Recursive: true,
    //   })
    //   .promise();

    // result.Parameters.forEach(ssmParameter => {
    //   ssmConfig[ssmParameter.Name.split('/itrex/clinic/lambda/')[1]] =
    //     ssmParameter.Value;
    // });

    console.log('\n');

    console.log(this.configService);
    console.log(this.configService.get('TEST_PARAMETER'));
    console.log('\n');

    // console.log('\n');
    // console.log(ssmConfig);
    // console.warn(ssmConfig);
    // console.log(ssmConfig);
    // console.warn(ssmConfig);
    // console.log('\n');

    const returnString = `Hello from Lambda! SSM Parameters: \n ${this.configService.get(
      'TEST_PARAMETER',
    )}`;

    return returnString;
  }
}
