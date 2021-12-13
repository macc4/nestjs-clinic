import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateResolutionDto {
  @ApiProperty()
  @IsNotEmpty()
  appointmentId: number;

  @ApiProperty()
  @IsNotEmpty()
  patientId: number;

  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
