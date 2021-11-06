import { IsDateString, IsOptional } from 'class-validator';

export class GetDoctorsAppointmentsQueryDto {
  @IsOptional()
  @IsDateString()
  date: string;
}
