import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserGender } from '@macc4-clinic/common';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { User } from '../entities/user.entity';

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
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  // @ApiProperty()
  // birthDate: string;

  @ApiProperty({ isArray: true, enum: UserRole })
  @IsNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles: UserRole[];
}
