import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorSpecializationsIndexes1635500010100
  implements MigrationInterface
{
  name = 'CreateDoctorSpecializationsIndexes1635500010100';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE INDEX IDX_appointments_visit_date ON clinic.appointments (visit_date)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP INDEX clinic.IDX_appointments_visit_date
    `);
  }
}
