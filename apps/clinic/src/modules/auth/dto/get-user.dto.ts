import { Role } from '../../users/entities/role.entity';

export class GetUserDto {
  id: string;
  email: string;
  roles: Role[];
  patientId?: number;
  doctorId?: number;
}
