import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../patients/patient.entity';

import { UserRole } from './user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: UserRole;

  @OneToOne(() => Patient, (patient) => patient.user, {
    nullable: true,
  })
  patient: Patient;
}
