import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsTable1635500010003
  implements MigrationInterface
{
  name = 'CreateNotificationsTable1635500010003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS notifications.notifications
    (
      id SERIAL NOT NULL, 
      user_id character varying NOT NULL, 
      type character varying NOT NULL, 
      payload jsonb NOT NULL,
      CONSTRAINT PK_notification_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE notifications.notifications;
    `);
  }
}
