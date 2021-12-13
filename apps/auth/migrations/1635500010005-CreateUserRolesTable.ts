import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesTable1635500010005 implements MigrationInterface {
  name = 'CreateUserRolesTable1635500010005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE auth.user_roles
    (
      user_id uuid NOT NULL,
      role_id integer NOT NULL,
      CONSTRAINT PK_user_roles_user_id_role_id PRIMARY KEY (user_id, role_id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE auth.user_roles
    `);
  }
}
