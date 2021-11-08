import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthDatabaseRoles1635500010001
  implements MigrationInterface
{
  name = 'CreateAuthDatabaseRoles1635500010001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS auth_reader;
    DROP ROLE IF EXISTS auth_writer;

    CREATE ROLE auth_reader;
    CREATE ROLE auth_writer;

    DROP ROLE IF EXISTS auth_user;
    CREATE ROLE auth_user password 'password' login INHERIT IN ROLE auth_writer;

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS auth_reader;
    DROP ROLE IF EXISTS auth_writer;
    DROP ROLE IF EXISTS auth_user;

    COMMIT;
    `);
  }
}
