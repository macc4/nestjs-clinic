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

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: string;

  @OneToMany(() => Resolution, (resolution) => resolution.doctor, {
    eager: false,
  })
  resolutions: Resolution[];

  @ManyToMany(() => Specialization)
  @JoinTable()
  specializations: Specialization[];
}
