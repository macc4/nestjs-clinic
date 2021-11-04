import { IsString, MaxLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @MaxLength(32)
  oldPassword: string;

  @IsString()
  @MaxLength(32)
  newPassword: string;
}
