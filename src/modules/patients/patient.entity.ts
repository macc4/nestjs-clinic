import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Resolution } from '../resolutions/resolution.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: string;

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];
}
