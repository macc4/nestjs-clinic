import { IsEnum, IsString } from 'class-validator';
import { UserRole } from '../utils/user-role.enum';

export class JwtPayloadDto {
  @IsString()
  id: string;

  @IsEnum(UserRole)
  role: UserRole;
}
