import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Resolution {
  @ApiProperty({ example: 1, description: 'ID of the resolution' })
  @PrimaryGeneratedColumn() // numbers, not uuid's
  id: number;

  @ApiProperty({ example: 1, description: 'ID of the corresponding patient' })
  @Column()
  patientId: number;

  @ApiProperty({ example: 1, description: 'ID of the corresponding doctor' })
  @Column()
  doctorId: number;

  @ApiProperty({ example: 'He is healthy!', description: 'Resolution text' })
  @Column()
  text: string;

  @ApiProperty({
    example: '10-02-1992',
    description: 'Expiry date of the resolution',
  })
  @Column()
  expiry: string;
}
