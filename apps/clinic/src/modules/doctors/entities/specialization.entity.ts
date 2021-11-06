import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('specializations', { schema: 'clinic' })
export class Specialization {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'ID of the specialization',
  })
  id: number;

  @Column({ unique: true })
  @ApiProperty({
    example: 'Psychiatrist',
    description: 'Specialization title',
  })
  title: string;
}
