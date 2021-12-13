import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../../appointments/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';

@Entity('patients', { schema: 'clinic' })
export class Patient {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'ID of the patient',
  })
  id: number;

  @Column({ name: 'user_id', unique: true })
  @ApiProperty({
    example: 'abd9a3f6-acd5-450a-9961-3ffba92f20e6',
    description: 'UUID of the related user',
  })
  userId: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    eager: false,
  })
  appointments: Appointment[];

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];
}
