import { Resolution } from '../../resolutions/entities/resolution.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Specialization } from './specialization.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

@Entity('doctors', { schema: 'clinic' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: string;

  @ManyToMany(() => Specialization)
  @JoinTable({
    name: 'doctor_specializations',
    joinColumn: {
      name: 'doctor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'specialization_id',
      referencedColumnName: 'id',
    },
  })
  specializations: Specialization[];

  @OneToMany(() => Appointment, (appointment) => appointment.doctor, {
    eager: false,
  })
  appointments: Appointment[];

  @OneToMany(() => Resolution, (resolution) => resolution.doctor, {
    eager: false,
  })
  resolutions: Resolution[];
}
