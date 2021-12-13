import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { BUCKET_STORAGE_MODULE } from './constants';
import { ModuleOptions } from './types';
import { createReadStream } from 'fs';

@Injectable()
export class BucketStorageService {
  private readonly client: AWS.S3;
  private readonly bucket: any;

  constructor(
    @Inject(BUCKET_STORAGE_MODULE) private readonly options: ModuleOptions,
  ) {
    const { region, accessKeyId, secretAccessKey, bucket } = options;

    this.bucket = bucket;
    this.client = new AWS.S3({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<string> {
    const imageFormat = file.originalname.split('.').slice(-1)[0];

    const imageName = fileName + '.' + imageFormat;

    const uploadParams = {
      Bucket: this.bucket,
      Body: file.buffer,
      Key: imageName,
    };

    const uploadedImage = await this.client.upload(uploadParams).promise();

    return uploadedImage.Location;
  }
}
