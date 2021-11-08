import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../../doctors/entities/doctor.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';

@Entity('resolutions', { schema: 'clinic' })
export class Resolution {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID of the resolution' })
  id: number;

  @Column()
  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  text: string;

  @OneToOne(() => Appointment, (appointment) => appointment.resolution, {
    eager: false,
  })
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @ManyToOne(() => Doctor, (doctor) => doctor.resolutions, { eager: true })
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.resolutions, { eager: true })
  @JoinColumn({ name: 'patient_id' })
  patient: Patient;
}
