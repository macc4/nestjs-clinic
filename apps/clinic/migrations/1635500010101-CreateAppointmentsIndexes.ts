import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorAppointmentsIndexes1635500010101
  implements MigrationInterface
{
  name = 'CreateDoctorAppointmentsIndexes1635500010101';

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
