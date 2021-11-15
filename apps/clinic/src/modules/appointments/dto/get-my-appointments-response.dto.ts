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
  patientUserId: UUIDVersion = '4';

  @ApiProperty()
  doctorUserId: UUIDVersion = '4';

  @ApiProperty()
  patientFirstName?: string;

  @ApiProperty()
  doctorFirstName?: string;

  @ApiProperty()
  patientLastName?: string;

  @ApiProperty()
  doctorLastName?: string;
}
