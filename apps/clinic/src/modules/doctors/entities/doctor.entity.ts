import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';
import { Specialization } from './specialization.entity';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('doctors', { schema: 'clinic' })
export class Doctor {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'ID of the doctor',
  })
  id: number;

  @Column({ name: 'user_id', unique: true })
  @ApiProperty({
    example: 'abd9a3f6-acd5-450a-9961-3ffba92f20e6',
    description: 'UUID of the related user',
  })
  userId: string;

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
