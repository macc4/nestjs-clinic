import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(32)
  email: string;

  @IsString()
  @MaxLength(32)
  password: string;
}
