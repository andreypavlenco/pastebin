import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  private _S3_BUCKET: string;
  private _S3_ACCESSKEYID: string;
  private _S3_SECRETACCESSKEY: string;

  constructor(private configService: ConfigService) {
    this._S3_BUCKET = this.configService.get<string>('aws.s3_bucket');
    this._S3_ACCESSKEYID = this.configService.get<string>('aws.s3_accessKeyId');
    this._S3_SECRETACCESSKEY = this.configService.get<string>(
      'aws.s3_secretAccessKey',
    );
  }

  private S3(): AWS.S3 {
    return new AWS.S3({
     //  accessKeyId: this._S3_ACCESSKEYID,
     //  secretAccessKey: this._S3_SECRETACCESSKEY,
    });
  }

  async saveFileS3(
    file: Buffer,
    originalName: string,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this._S3_BUCKET,
        Key: originalName,
        Body: file,
        ContentType: 'text/plain',
        ContentDisposition: 'inline',
      };
      return await this.S3().upload(params).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findFileS3(keyFile: string): Promise<Buffer> {
    try {
      const params: AWS.S3.GetObjectAclRequest = {
        Bucket: this._S3_BUCKET,
        Key: keyFile,
      };
      const file = await this.S3().getObject(params).promise();
      return file.Body as Buffer;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deleteFileS3(keyFile: string): Promise<AWS.S3.DeleteObjectOutput> {
    try {
      const params: AWS.S3.DeleteObjectRequest = {
        Bucket: this._S3_BUCKET,
        Key: keyFile,
      };
      return await this.S3().deleteObject(params).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async autoDeleteFilesS3(
    keysToDelete: string[],
  ): Promise<AWS.S3.DeleteObjectsOutput> {
    try {
      const keysFiles = keysToDelete.map((key_file) => ({ Key: key_file }));
      const params = {
        Bucket: this._S3_BUCKET,
        Delete: {
          Objects: keysFiles,
          Quiet: false,
        },
      };
      return await this.S3().deleteObjects(params).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateFileS3(
    keyFile: string,
    newFile: Buffer,
  ): Promise<AWS.S3.PutObjectOutput> {
    try {
      const params: AWS.S3.PutObjectRequest = {
        Bucket: this._S3_BUCKET,
        Key: keyFile,
        Body: newFile,
        ContentType: 'text/plain',
      };
      return await this.S3().putObject(params).promise();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
