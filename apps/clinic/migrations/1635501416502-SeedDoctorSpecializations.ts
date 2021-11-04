import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctorSpecializations1635501416502
  implements MigrationInterface
{
  name = 'SeedDoctorSpecializations1635501416502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('1', '1');

    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('2', '2');
      
    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('3', '3');
        
    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      clinic.doctor_specializations
    WHERE
      doctor_id = 3;

    DELETE FROM
      clinic.doctor_specializations
    WHERE
      doctor_id = 2;

    DELETE FROM
      clinic.doctor_specializations
    WHERE
      doctor_id = 1;

    COMMIT;
    `);
  }
}
