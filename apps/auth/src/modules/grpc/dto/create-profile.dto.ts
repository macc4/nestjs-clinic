import { UserGender } from '@macc4-clinic/common';

export class CreateProfileDto {
  userId: string;
  firstName: string;
  lastName: string;
  gender: UserGender;
  birthDate: Date;
}
