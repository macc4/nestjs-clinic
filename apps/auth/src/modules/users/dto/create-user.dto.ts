import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from '../enums/user-gender.enum';
import { UserRole } from '@macc4-clinic/common';

export class CreateUserDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  hashedPassword: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  gender: UserGender;

  // @ApiProperty()
  // birthDate: string;

  @ApiProperty()
  roles: UserRole[];
}
