import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(32)
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  readonly password: string;
}
