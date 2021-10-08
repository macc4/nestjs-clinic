import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
