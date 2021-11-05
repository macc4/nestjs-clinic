import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserGender } from '@macc4-clinic/common';

@Entity('profiles', { schema: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: UserGender;

  @Column({ unique: true })
  user_id: string;
}
