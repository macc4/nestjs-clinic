import { IsOptional, IsString } from 'class-validator';

export class GetDoctorsQueryDto {
  @IsOptional()
  @IsString()
  specialization: string;
}
