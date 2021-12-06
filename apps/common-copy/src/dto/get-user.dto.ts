import { UserRole } from '../enums/user-role.enum';

export class GetUserDto {
  id: string;
  roles: UserRole[];
}
