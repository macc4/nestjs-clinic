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

  @Column({ name: 'first_name' })
  @ApiProperty({
    example: 'Natasha',
    description: 'First name of the user',
  })
  firstName: string;

  @Column({ name: 'last_name' })
  @ApiProperty({
    example: 'Yelin Chang',
    description: 'Last name of the user',
  })
  lastName: string;

  @Column()
  @ApiProperty({
    example: 'Female',
    description: 'Gender of the user',
    enum: UserGender,
  })
  gender: UserGender;

  @Column({ name: 'birth_date' })
  @ApiProperty({
    example: '2000-01-09T00:00:00.000Z',
    description: 'Birth date of the user',
  })
  birthDate: Date;

  @Column({ name: 'avatar_url', nullable: true })
  @ApiProperty({
    example:
      'https://itrex-clinic-aleksei.s3.eu-north-1.amazonaws.com/avatars/default.jpg',
    description: 'Link to the S3 image',
  })
  avatarUrl: string;

  @Column({ name: 'user_id', unique: true })
  @ApiProperty({
    example: '21ed452e-b3da-47d6-bd0c-8abea993cf0b',
    description: 'UUID of the corresponding user',
  })
  userId: string;
}
