import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthSchema1635500010002 implements MigrationInterface {
  name = 'CreateAuthSchema1635500010002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE SCHEMA IF NOT EXISTS auth AUTHORIZATION root;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP SCHEMA IF EXISTS auth;
    `);
  }
}
