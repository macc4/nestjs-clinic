import { IsDateString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsNotEmpty()
  doctorId: number;

  @IsNotEmpty()
  reason: string;

  @IsOptional()
  note: string;

  @IsNotEmpty()
  @IsDateString()
  visitDate: Date;
}
