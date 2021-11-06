import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PatchResolutionDto {
  @ApiProperty()
  @IsNotEmpty()
  text: string;
}
