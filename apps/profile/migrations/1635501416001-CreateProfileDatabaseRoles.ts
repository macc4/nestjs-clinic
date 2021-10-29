import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileDatabaseRoles1635501416001
  implements MigrationInterface
{
  name = 'CreateProfileDatabaseRoles1635501416001';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS clinic_reader;
    DROP ROLE IF EXISTS clinic_writer;

    CREATE ROLE clinic_reader;
    CREATE ROLE clinic_writer;

    DROP ROLE IF EXISTS clinic_user;
    CREATE ROLE clinic_user password 'password' login INHERIT IN ROLE clinic_writer;

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
