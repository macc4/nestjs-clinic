import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('notifications', { schema: 'notifications' })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: string;

  @Column()
  type: string;

  @Column()
  read: boolean;

  @Column({
    type: 'jsonb',
  })
  payload: Record<string, any>;
}
