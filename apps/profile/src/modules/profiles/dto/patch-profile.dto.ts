import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PatchProfileDto {
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
