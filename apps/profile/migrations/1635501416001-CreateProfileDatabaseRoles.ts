import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileDatabaseRoles1635501416001
  implements MigrationInterface
{
  name = 'CreateProfileDatabaseRoles1635501416001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS profile_reader;
    DROP ROLE IF EXISTS profile_writer;

    CREATE ROLE profile_reader;
    CREATE ROLE profile_writer;

    DROP ROLE IF EXISTS profile_user;
    CREATE ROLE profile_user password 'password' login INHERIT IN ROLE profile_writer;

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS profile_reader;
    DROP ROLE IF EXISTS profile_writer;
    DROP ROLE IF EXISTS profile_user;

    COMMIT;
    `);
  }
}
