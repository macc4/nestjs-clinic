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
  text: string;
}
