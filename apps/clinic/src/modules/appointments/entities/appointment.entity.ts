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
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID of the appointment' })
  id: number;

  @Column()
  @ApiProperty({
    example: 'My head hurts',
    description: 'Reason for the appointment',
  })
  reason: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'I also have stomach pains',
    description: 'A note field for semi-related info',
  })
  note: string;

  @Column({ type: 'timestamptz' })
  @ApiProperty({
    example: '2021-12-05 15:00',
    description: 'Preferred visit date',
  })
  visit_date: Date;

  @OneToOne(() => Resolution, (resolution) => resolution.appointment, {
    eager: true,
  })
  resolution: Resolution;

  @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
