import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender } from '@macc4-clinic/common';

export class SignUpDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(32)
  email: string;

  @IsString()
  @MaxLength(32)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name: string;

  @IsEnum(UserGender)
  gender: UserGender;

  // @IsDateString()
  // birthDate: string;
}
