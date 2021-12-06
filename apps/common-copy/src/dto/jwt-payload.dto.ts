import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../enums/user-role.enum';

export class JwtPayloadDto {
  @IsString()
  id: string;

  @IsEnum(UserRole)
  roles: UserRole[];
}
