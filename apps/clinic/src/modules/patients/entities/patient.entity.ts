import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';

@Entity('patient', { schema: 'clinic' })
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  user_id: string;

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];
}
