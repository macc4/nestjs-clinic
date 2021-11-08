import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class GetDoctorsAppointmentsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  date: string;
}
