import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../auth/users/user.entity';
import { Resolution } from '../resolutions/resolution.entity';
import { PatientGender } from './patient-gender.enum';

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
  @JoinColumn()
  user: User;
}
