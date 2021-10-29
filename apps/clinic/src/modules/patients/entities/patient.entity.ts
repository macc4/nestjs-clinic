import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resolution } from '../../resolutions/entities/resolution.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  userId: string;

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];
}
