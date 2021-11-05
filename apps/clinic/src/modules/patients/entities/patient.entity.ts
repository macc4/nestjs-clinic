import { Appointment } from 'src/modules/appointments/entities/appointment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';

@Entity('patients', { schema: 'clinic' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
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
