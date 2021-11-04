import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePatientsTable1635501416006 implements MigrationInterface {
  name = 'CreatePatientsTable1635501416006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE clinic.patient
    (
      id SERIAL NOT NULL, 
      user_id character varying NOT NULL, 
      CONSTRAINT UQ_patient_user_id UNIQUE (user_id), 
      CONSTRAINT PK_patient_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.patient;
    `);
  }
}
