import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetDoctorsQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  specialization: string;
}
