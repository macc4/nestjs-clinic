import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileSchema1635501416002 implements MigrationInterface {
  name = 'CreateProfileSchema1635501416002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS profile AUTHORIZATION root;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP SCHEMA IF EXISTS profile;
    `);
  }
}
