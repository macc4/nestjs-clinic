import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsSchema1635500010002
  implements MigrationInterface
{
  name = 'CreateNotificationsSchema1635500010002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS notifications AUTHORIZATION root;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP SCHEMA IF EXISTS notifications;
    `);
  }
}
