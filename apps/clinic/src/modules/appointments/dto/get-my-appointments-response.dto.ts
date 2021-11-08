import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { UUIDVersion } from 'class-validator';

export class GetMyAppointmentsResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  reason: string;

  @ApiPropertyOptional()
  note: string;

  @ApiProperty()
  visit_date: string;

  @ApiProperty()
  patient_user_id: UUIDVersion;

  @ApiProperty()
  doctor_user_id: UUIDVersion;

  @ApiProperty()
  patient_name?: string;

  @ApiProperty()
  doctor_name?: string;
}
