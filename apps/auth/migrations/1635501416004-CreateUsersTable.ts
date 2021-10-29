import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUsersTable1635501416004 implements MigrationInterface {
  name = 'CreateUsersTable1635501416004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE auth.user
    (
      id uuid NOT NULL DEFAULT uuid_generate_v4(), 
      email character varying NOT NULL, 
      password character varying NOT NULL, 
      CONSTRAINT UQ_user_email UNIQUE (email), 
      CONSTRAINT PK_user_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE auth.user;
    `);
  }
}
