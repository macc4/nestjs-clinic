import { UserGender } from '../../common/enums/user-gender.enum';

export class CreateProfileDto {
  userId: string;
  name: string;
  gender: UserGender;
}
