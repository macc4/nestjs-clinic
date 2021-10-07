import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resolution {
  @ApiProperty({ example: 1, description: 'ID of the resolution' })
  @PrimaryGeneratedColumn() // numbers, not uuid's
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the corresponding patient' })
  @Column()
  patient_id: number;

  @ApiProperty({ example: 1, description: 'ID of the corresponding doctor' })
  @Column()
  doctor_id: number;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  text: string;

  @ApiProperty({
    example: '1901-09-11T11:30:00.732Z',
    description: 'Expiry date of the resolution',
  })
  @Column({ nullable: true })
  expiry: Date;
}
