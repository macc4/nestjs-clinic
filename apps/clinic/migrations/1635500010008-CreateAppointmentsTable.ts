import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentsTable1635500010008
  implements MigrationInterface
{
  name = 'CreateAppointmentsTable1635500010008';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE clinic.appointments (
      id SERIAL NOT NULL, 
      reason character varying NOT NULL, 
      note character varying, 
      visit_date timestamp with time zone NOT NULL, 
      doctor_id integer, 
      patient_id integer, 
      CONSTRAINT PK_appointment_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.appointments
    `);
  }
}
