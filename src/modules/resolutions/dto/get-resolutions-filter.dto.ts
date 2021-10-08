import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class GetResolutionsFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  patientId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  doctorId: number;
}
