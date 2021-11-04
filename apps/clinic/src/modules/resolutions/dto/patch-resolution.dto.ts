import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PatchResolutionDto {
  @IsNotEmpty()
  @ApiProperty()
  text: string;
}
