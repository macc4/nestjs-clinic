import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreatePatientDto {
  @ApiProperty()
  @IsNotEmpty()
  userId: string;
}
