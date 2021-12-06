import * as _ from 'lodash';
import { Inject, Injectable } from '@nestjs/common';
import { Config } from './config.types';
import { CONFIG_STORE } from './config.constants';

@Injectable()
export class ConfigService {
  constructor(@Inject(CONFIG_STORE) private internalConfig: Config) {}

  get(key: string): any {
    return _.get(this.internalConfig, key);
  }
}
