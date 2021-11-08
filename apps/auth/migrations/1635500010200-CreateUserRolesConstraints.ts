import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRolesConstraints1635500010200
  implements MigrationInterface
{
  name = 'CreateUserRolesConstraints1635500010200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      auth.user_roles
    ADD 
      CONSTRAINT FK_user_roles_user_id FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
    ALTER TABLE 
      auth.user_roles
    ADD 
      CONSTRAINT FK_user_roles_role_id FOREIGN KEY (role_id) REFERENCES auth.roles(id) ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE user_roles_role DROP CONSTRAINT FK_user_roles_role_id;
    `);

    await queryRunner.query(`
    ALTER TABLE user_roles_role DROP CONSTRAINT FK_user_roles_user_id;
    `);
  }
}
