import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

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
  expiry: string;
}
