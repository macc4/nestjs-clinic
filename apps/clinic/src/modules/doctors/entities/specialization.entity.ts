import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specialization', { schema: 'clinic' })
export class Specialization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;
}
