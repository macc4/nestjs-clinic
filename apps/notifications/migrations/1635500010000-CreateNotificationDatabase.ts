import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateNotificationsDatabase1635500010000
  implements MigrationInterface
{
  name = 'CreateNotificationsDatabase1635500010000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // CREATE DATABASE notifications;
    // `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(`
    // DROP DATABASE notifications;
    // `);
  }
}
