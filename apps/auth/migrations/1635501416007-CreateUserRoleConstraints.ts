import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserRoleConstraints1635501416007
  implements MigrationInterface
{
  name = 'CreateUserRoleConstraints1635501416007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      auth.user_roles
    ADD 
      CONSTRAINT FK_user_roles_user_id FOREIGN KEY (user_id) REFERENCES auth.user(id) ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
    ALTER TABLE 
      auth.user_roles
    ADD 
      CONSTRAINT FK_user_roles_role_id FOREIGN KEY (role_id) REFERENCES auth.role(id) ON DELETE CASCADE ON UPDATE CASCADE
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
