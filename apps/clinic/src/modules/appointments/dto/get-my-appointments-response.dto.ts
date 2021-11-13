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
  visitDate: string;

  @ApiProperty()
  patientUserId: UUIDVersion;

  @ApiProperty()
  doctorUserId: UUIDVersion;

  @ApiProperty()
  patientName?: string;

  @ApiProperty()
  doctorName?: string;
}
