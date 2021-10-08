import { IsEnum, IsNotEmpty } from 'class-validator';
import { PatientGender } from '../patient-gender.enum';

export class CreatePatientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(PatientGender)
  gender: PatientGender;
}
