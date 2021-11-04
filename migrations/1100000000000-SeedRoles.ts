import { plainToClass } from 'class-transformer';
import { Role } from 'src/modules/users/entities/role.entity';
import { UserRole } from 'src/modules/users/enums/user-role.enum';
import { In, MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1100000000000 implements MigrationInterface {
  name = 'SeedRoles1100000000000';

  private generateData(): any[] {
    return [
      { title: UserRole.ADMIN },
      { title: UserRole.PATIENT },
      { title: UserRole.DOCTOR },
    ];
  }
  public async up(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager;

    const rolesData = this.generateData();
    const roles = plainToClass(Role, rolesData);

    await manager.save(Role, roles);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const manager = queryRunner.manager;

    const rolesData = this.generateData();

    await manager.delete(Role, {
      title: In(rolesData.map((role) => role.title)),
    });
  }
}
