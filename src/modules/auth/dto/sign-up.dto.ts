import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PatientGender } from 'src/modules/patients/utils/patient-gender.enum';
import { UserRole } from '../utils/user-role.enum';

export class SignUpDto {
  @IsString()
  @IsEmail()
  @MinLength(4)
  @MaxLength(32)
  email: string;

  @IsString()
  @MaxLength(32)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(24)
  name: string;

  @IsEnum(PatientGender)
  gender: PatientGender;

  @IsOptional()
  @IsEnum(UserRole)
  role: UserRole;
}
