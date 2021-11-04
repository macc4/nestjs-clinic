import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRolesTable1635501416003 implements MigrationInterface {
  name = 'CreateRolesTable1635501416003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE IF NOT EXISTS auth.role
    (
      id SERIAL NOT NULL, 
      title character varying NOT NULL, 
      CONSTRAINT UQ_role_title UNIQUE (title), 
      CONSTRAINT PK_role_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE auth.role;
    `);
  }
}
