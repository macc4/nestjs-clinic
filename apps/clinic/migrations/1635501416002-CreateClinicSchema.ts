import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClinicSchema1635501416002 implements MigrationInterface {
  name = 'CreateClinicSchema1635501416002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS clinic AUTHORIZATION root;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP SCHEMA IF EXISTS clinic;
    `);
  }
}
