import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Resolution } from '../../resolutions/entities/resolution.entity';
import { UserGender } from '../../users/enums/user-gender.enum';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: UserGender;

  @OneToMany(() => Resolution, (resolution) => resolution.patient, {
    eager: false,
  })
  resolutions: Resolution[];

  @OneToOne(() => User, (user) => user.patient, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
