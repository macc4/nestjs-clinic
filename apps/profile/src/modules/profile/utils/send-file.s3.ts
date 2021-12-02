import * as AWS from 'aws-sdk';
import { createReadStream } from 'fs';

const s3 = new AWS.S3({
  region: 'eu-north-1',
});

export const sendFile = async (file: Express.Multer.File, fileName: string) => {
  const fileStream = createReadStream(file.path);

  const imageName = fileName + '.jpg';

  const uploadParams = {
    Bucket: 'itrex-clinic-aleksei/avatars',
    Body: fileStream,
    Key: imageName,
  };

  return s3.upload(uploadParams).promise();
};
