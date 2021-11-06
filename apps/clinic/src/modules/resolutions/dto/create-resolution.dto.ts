import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  appointmentId: number;

  @IsNotEmpty()
  @ApiProperty()
  patientId: number;

  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
