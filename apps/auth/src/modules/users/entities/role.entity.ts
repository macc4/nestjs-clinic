import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role', { schema: 'auth' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;
}
