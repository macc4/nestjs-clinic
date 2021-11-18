import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesIndexes1635500010100 implements MigrationInterface {
  name = 'CreateUserRolesIndexes1635500010100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    CREATE INDEX IDX_user_roles_user_id ON auth.user_roles (user_id);
    CREATE INDEX IDX_user_roles_role_id ON auth.user_roles (role_id);

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP INDEX auth.IDX_user_roles_role_id;
    DROP INDEX auth.IDX_user_roles_user_id;

    COMMIT;
    `);
  }
}
