import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserGender } from '../../common/enums/user-gender.enum';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  gender: UserGender;

  @Column({ unique: true })
  userId: string;
}
