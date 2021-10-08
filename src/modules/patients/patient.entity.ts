import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/user.entity';
import { Resolution } from '../resolutions/resolution.entity';
import { PatientGender } from './utils/patient-gender.enum';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: PatientGender;

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];

  @OneToOne(() => User, (user) => user.patient, {
    eager: true,
    cascade: true,
  })
  user: User;
}
