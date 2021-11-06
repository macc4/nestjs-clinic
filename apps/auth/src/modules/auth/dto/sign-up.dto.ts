import {
  IsEmail,
  IsEnum,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UserGender } from '@macc4-clinic/common';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(32)
  email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name: string;

  @ApiProperty()
  @IsEnum(UserGender)
  gender: UserGender;

  // @ApiProperty()
  // @IsDateString()
  // birthDate: string;
}
