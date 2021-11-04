import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorSpecializationsTable1635501416005
  implements MigrationInterface
{
  name = 'CreateDoctorSpecializationsTable1635501416005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE clinic.doctor_specializations
    (
      doctor_id integer NOT NULL, 
      specialization_id integer NOT NULL, 
      CONSTRAINT PK_doctor_specializations PRIMARY KEY (
        doctor_id, specialization_id
      )
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.doctor_specializations
    `);
  }
}
