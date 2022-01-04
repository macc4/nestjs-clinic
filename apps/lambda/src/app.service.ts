import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

const ssmClient = new AWS.SSM({ region: 'eu-north-1' });

@Injectable()
export class AppService {
  async getParametersFromSsmAndLog(): Promise<any> {
    // const test = event['test'];

    const ssmConfig = {};

    const result = await ssmClient
      .getParametersByPath({
        Path: '/itrex/clinic/lambda/',
        Recursive: true,
      })
      .promise();

    result.Parameters.forEach(ssmParameter => {
      ssmConfig[ssmParameter.Name.split('/itrex/clinic/lambda/')[1]] =
        ssmParameter.Value;
    });

    console.log('\n');
    console.log(ssmConfig);
    console.warn(ssmConfig);
    console.log(ssmConfig);
    console.warn(ssmConfig);
    console.log('\n');

    const returnString = `Hello from Lambda! SSM Parameters: \n ${JSON.stringify(
      ssmConfig,
      null,
      4,
    )}`;

    return returnString;
  }
}
