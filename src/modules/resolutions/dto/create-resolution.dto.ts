import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, Min } from 'class-validator';

const defaultExpiry = +process.env.EXPIRY;

export class CreateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  patientId: number;

  @IsNotEmpty()
  @ApiProperty()
  doctorId: number;

  @IsNotEmpty()
  @ApiProperty()
  text: string;

  @IsOptional()
  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  expiry: number;

  get expiryDate(): Date {
    if (!this.expiry) {
      if (defaultExpiry === -1) {
        return null;
      }

      return new Date(Date.now() + defaultExpiry * 60 * 1000);
    }

    return new Date(Date.now() + this.expiry * 60 * 1000);
  }
}
