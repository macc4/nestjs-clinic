import { Resolution } from 'src/modules/resolutions/entities/resolution.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { UserGender } from '../../users/enums/user-gender.enum';
import { Specialization } from './specialization.entity';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: UserGender;

  @OneToMany(() => Resolution, (resolution) => resolution.doctor, {
    eager: false,
  })
  resolutions: Resolution[];

  @ManyToMany(() => Specialization)
  @JoinTable()
  specializations: Specialization[];

  @OneToOne(() => User, (user) => user.doctor, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
