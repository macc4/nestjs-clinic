import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserGender } from '@macc4-clinic/common';
import { IsDateString, IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  hashedPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  birthDate: Date;

  @ApiProperty({ isArray: true, enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}
