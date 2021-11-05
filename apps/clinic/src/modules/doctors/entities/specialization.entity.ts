import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specializations', { schema: 'clinic' })
export class Specialization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  title: string;
}
