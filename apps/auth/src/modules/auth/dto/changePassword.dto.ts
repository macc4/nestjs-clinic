import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @MaxLength(32)
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  newPassword: string;
}
