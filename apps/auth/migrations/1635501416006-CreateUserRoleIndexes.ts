import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleIndexes1635501416006 implements MigrationInterface {
  name = 'CreateUserRoleIndexes1635501416006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    CREATE INDEX IDX_user_roles_user_id_idx ON auth.user_roles (user_id);
    CREATE INDEX IDX_user_roles_role_id_idx ON auth.user_roles (role_id);

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP INDEX auth.IDX_user_roles_role_id_idx;
    DROP INDEX auth.IDX_user_roles_user_id_idx;

    COMMIT;
    `);
  }
}
