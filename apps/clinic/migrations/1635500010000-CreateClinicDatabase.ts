import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateClinicDatabase1635500010000 implements MigrationInterface {
  name = 'CreateClinicDatabase1635500010000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // CREATE DATABASE clinic;
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // DROP DATABASE clinic;
    // `);
  }
}
