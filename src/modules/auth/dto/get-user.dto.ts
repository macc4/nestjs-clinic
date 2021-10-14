import { Role } from 'src/modules/users/entities/role.entity';

export class GetUserDto {
  id: string;
  email: string;
  roles: Role[];
  patientId?: number;
  doctorId?: number;
}
