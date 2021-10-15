import { ApiProperty } from '@nestjs/swagger';
import { UserGender } from '../enums/user-gender.enum';
import { UserRole } from '../enums/user-role.enum';

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
