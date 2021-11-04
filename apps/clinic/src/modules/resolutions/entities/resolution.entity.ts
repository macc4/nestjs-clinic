import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../../doctors/entities/doctor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity('resolution', { schema: 'clinic' })
export class Resolution {
  @ApiProperty({ example: 1, description: 'ID of the resolution' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  text: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.resolutions, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.resolutions, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
