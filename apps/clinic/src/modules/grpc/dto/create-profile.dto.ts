import { UserGender } from '@macc4-clinic/common';

export class CreateProfileDto {
  userId: string;
  name: string;
  gender: UserGender;
}
