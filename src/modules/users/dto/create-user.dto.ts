import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserRole } from '../user-role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsNotEmpty()
  @ApiProperty()
  role: UserRole;
}
