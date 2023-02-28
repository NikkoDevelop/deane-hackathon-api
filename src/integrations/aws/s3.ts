import mime from 'mime-types';
import cuid from 'cuid';
import { AWS_BUCKET_NAME, AWS_REGION, SIGN_URL_EXPIRES } from '../../config';
import aws from './aws';

const client = new aws.S3({
  signatureVersion: 'v4',
  region: AWS_REGION || 'eu-west-1',
});

export const objectType = ({ type }: any) => {
  return type === 'image/jpeg' || type === 'image/png' || type === 'video/mp4';
};

export const objectExist = async ({ fileName }: any): Promise<boolean> => {
  const params = {
    Key: fileName,
    Bucket: AWS_BUCKET_NAME,
  };

  try {
    await client.headObject(params).promise();
    return true;
  } catch (error) {
    return false;
  }
};

export const deleteObject = async ({ fileName }: any) => {
  try {
    await client.deleteObject({
      Key: fileName,
      Bucket: AWS_BUCKET_NAME,
    }).promise();
  } catch (error) {
    throw new Error(error);
  }
};

export const getSignedUrl = async ({ fileName, type }: GetSignedUrlInput): Promise<GetSignedUrlResponse> => {
  let params: any = {};
  let objectKey = fileName;
  const action = 'putObject';

  objectKey = cuid();
  params = {
    Bucket: AWS_BUCKET_NAME,
    Key: `${objectKey}/${objectKey}.${mime.extension(type)}`,
    ContentType: type,
    Expires: Number(SIGN_URL_EXPIRES),
    StorageClass: 'REDUCED_REDUNDANCY',
    ACL: 'public-read',
  };

  const signedURL: string = await new Promise((resolve, reject) => {
    client.getSignedUrl(action, params, (err, url) => {
      if (err) {
        reject(err);
      } else {
        resolve(url);
      }
    });
  });

  return { signedURL, fileName: params.Key, objectURL: `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${params.Key}`, expensive: params.Expires };
};

export interface GetSignedUrlInput {
  fileName?: string | null;
  type?: string | null;
}

export interface GetSignedUrlResponse {
  signedURL: string;
  fileName: string;
  objectURL: string;
  expensive: number;
}

