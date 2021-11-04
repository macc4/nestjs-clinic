import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResolutionsTable1635501416007 implements MigrationInterface {
  name = 'CreateResolutionsTable1635501416007';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE clinic.resolution (
      id SERIAL NOT NULL, 
      text character varying NOT NULL, 
      doctor_id integer, 
      patient_id integer, 
      CONSTRAINT PK_resolution_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.resolution;
    `);
  }
}
