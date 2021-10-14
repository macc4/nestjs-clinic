import { Doctor } from 'src/modules/doctors/entities/doctor.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Role)
  @JoinTable()
  roles: Role[];

  @OneToOne(() => Patient, (patient) => patient.user, {
    nullable: true,
  })
  patient: Patient;

  @OneToOne(() => Doctor, (doctor) => doctor.user, {
    nullable: true,
  })
  doctor: Doctor;
}
