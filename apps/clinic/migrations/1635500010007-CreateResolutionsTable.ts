import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResolutionsTable1635500010007 implements MigrationInterface {
  name = 'CreateResolutionsTable1635500010007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE clinic.resolutions (
      id SERIAL NOT NULL, 
      text character varying NOT NULL, 
      doctor_id integer, 
      patient_id integer, 
      appointment_id integer,
      CONSTRAINT PK_resolution_id PRIMARY KEY (id),
      CONSTRAINT UQ_resolutions_appointment_id UNIQUE (appointment_id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.resolutions;
    `);
  }
}
