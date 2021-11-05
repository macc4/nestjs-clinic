import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Resolution } from 'src/modules/resolutions/entities/resolution.entity';

@Entity('appointments', { schema: 'clinic' })
export class Appointment {
  @ApiProperty({ example: 1, description: 'ID of the appointment' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  reason: string;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  note: string;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  visit_date: string;

  @OneToOne(() => Resolution, (resolution) => resolution.appointment, {
    eager: true,
  })
  @JoinColumn({ name: 'resolution_id' })
  resolution: Resolution;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
