import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileDatabase1635501416000 implements MigrationInterface {
  name = 'CreateProfileDatabase1635501416000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // CREATE DATABASE profile;
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // DROP DATABASE profile;
    // `);
  }
}
