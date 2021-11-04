import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthDatabase1635501416000 implements MigrationInterface {
  name = 'CreateAuthDatabase1635501416000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // CREATE DATABASE auth;
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // DROP DATABASE auth;
    // `);
  }
}
