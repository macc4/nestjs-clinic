import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsDatabaseRoles1635500010001
  implements MigrationInterface
{
  name = 'CreateNotificationsDatabaseRoles1635500010001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS notifications_reader;
    DROP ROLE IF EXISTS notifications_writer;

    CREATE ROLE notifications_reader;
    CREATE ROLE notifications_writer;

    DROP ROLE IF EXISTS notifications_user;
    CREATE ROLE notifications_user password 'password' login INHERIT IN ROLE notifications_writer;

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS notifications_reader;
    DROP ROLE IF EXISTS notifications_writer;
    DROP ROLE IF EXISTS notifications_user;

    COMMIT;
    `);
  }
}
