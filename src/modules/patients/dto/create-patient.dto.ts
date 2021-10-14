import { User } from 'src/modules/users/entities/user.entity';
import { UserGender } from '../../users/enums/user-gender.enum';

export class CreatePatientDto {
  name: string;
  gender: UserGender;
  user: User;
}
