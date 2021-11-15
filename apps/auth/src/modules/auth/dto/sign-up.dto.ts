import {
  IsDateString,
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
  readonly email: string;

  @ApiProperty()
  @IsString()
  @MaxLength(32)
  readonly password: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  readonly firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(24)
  readonly lastName: string;

  @ApiProperty()
  @IsEnum(UserGender)
  readonly gender: UserGender;

  @ApiProperty()
  @IsDateString()
  birthDate: Date;
}
