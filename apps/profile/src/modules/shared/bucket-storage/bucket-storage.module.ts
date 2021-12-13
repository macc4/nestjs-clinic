import { DynamicModule, Global, Module } from '@nestjs/common';
import { BucketStorageService } from './bucket-storage.service';
import { BUCKET_STORAGE_MODULE } from './constants';
import { ModuleAsyncOptions } from './types';

@Global()
@Module({})
export class BucketStorageModule {
  constructor() {}

  public static registerAsync(options: ModuleAsyncOptions): DynamicModule {
    return {
      module: BucketStorageModule,
      imports: options.imports || [],
      providers: [
        {
          provide: BUCKET_STORAGE_MODULE,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        BucketStorageService,
      ],
      exports: [BucketStorageService],
    };
  }
}
