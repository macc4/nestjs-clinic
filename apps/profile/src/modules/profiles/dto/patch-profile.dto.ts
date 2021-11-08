import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PatchProfileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
