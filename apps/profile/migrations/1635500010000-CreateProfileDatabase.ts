import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileDatabase1635500010000 implements MigrationInterface {
  name = 'CreateProfileDatabase1635500010000';

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
