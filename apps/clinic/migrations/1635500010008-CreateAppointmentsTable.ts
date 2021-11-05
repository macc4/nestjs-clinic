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
      note character varying NOT NULL, 
      visit_date character varying NOT NULL, 
      resolution_id integer, 
      doctor_id integer, 
      patient_id integer, 
      CONSTRAINT PK_appointment_id PRIMARY KEY (id),
      CONSTRAINT REL_appointments_resolution_id UNIQUE (resolution_id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.appointments
    `);
  }
}
