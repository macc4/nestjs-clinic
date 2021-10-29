import { Resolution } from '../../resolutions/entities/resolution.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Specialization } from './specialization.entity';

@Entity('doctor', { schema: 'clinic' })
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: string;

  @OneToMany(() => Resolution, (resolution) => resolution.doctor, {
    eager: false,
  })
  resolutions: Resolution[];

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
}
