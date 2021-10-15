import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../../doctors/entities/doctor.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Patient } from '../../patients/entities/patient.entity';

@Entity()
export class Resolution {
  @ApiProperty({ example: 1, description: 'ID of the resolution' })
  @PrimaryGeneratedColumn() // numbers, not uuid's
  id: number;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  text: string;

  @ApiProperty({
    example: '1901-09-11T11:30:00.732Z',
    description: 'Expiry date of the resolution',
  })
  @Column({ nullable: true })
  expiry: Date;

  @ManyToOne(() => Doctor, (doctor) => doctor.resolutions, { eager: true })
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.resolutions, { eager: true })
  patient: Patient;

  @Column()
  patientId: number;
}
