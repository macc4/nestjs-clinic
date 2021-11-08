import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserGender } from '@macc4-clinic/common';
import { ApiProperty } from '@nestjs/swagger';

@Entity('profiles', { schema: 'profile' })
export class Profile {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'ID of the profile',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Natasha Yelin Chang',
    description: 'Name of the user',
  })
  name: string;

  @Column()
  @ApiProperty({
    example: 'Female',
    description: 'Gender of the user',
    enum: UserGender,
  })
  gender: UserGender;

  @Column({ unique: true })
  @ApiProperty({
    example: '21ed452e-b3da-47d6-bd0c-8abea993cf0b',
    description: 'UUID of the corresponding user',
  })
  user_id: string;
}
