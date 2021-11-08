import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
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

  @Column({ unique: true })
  @ApiProperty({
    example: 'abd9a3f6-acd5-450a-9961-3ffba92f20e6',
    description: 'UUID of the related user',
  })
  user_id: string;

  @OneToMany(() => Appointment, (appointment) => appointment.patient, {
    eager: false,
  })
  appointments: Appointment[];

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];
}
