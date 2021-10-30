import { ApiProperty } from '@nestjs/swagger';
import { UserRole, UserGender } from '@macc4-clinic/common';

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
