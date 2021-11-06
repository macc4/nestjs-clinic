import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctors1635500010501 implements MigrationInterface {
  name = 'SeedDoctors1635500010501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO clinic.doctors (id, user_id) 
    VALUES 
      ('1', '21ed452e-b3da-47d6-bd0c-8abea993cf0b');

    INSERT INTO clinic.doctors (id, user_id) 
    VALUES 
      ('2', 'abd9a3f6-acd5-450a-9961-3ffba92f20e6');
      
    INSERT INTO clinic.doctors (id, user_id) 
    VALUES 
      ('3', 'c1414d7c-cd5d-4d1a-9c29-7311bb21c884');

    INSERT INTO clinic.doctors (id, user_id) 
    VALUES 
      ('4', '65c7bf31-c24d-42c8-bd4f-1ceee57496b2');

    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('1', '1');

    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('2', '2');
      
    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('3', '3');

    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('4', '2');
        
    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      clinic.doctor_specializations
    WHERE
      doctor_id = 4;

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

    DELETE FROM
      clinic.doctors
    WHERE
      user_id = '65c7bf31-c24d-42c8-bd4f-1ceee57496b2';

    DELETE FROM
      clinic.doctors
    WHERE
      user_id = 'c1414d7c-cd5d-4d1a-9c29-7311bb21c884';

    DELETE FROM
      clinic.doctors
    WHERE
      user_id = 'abd9a3f6-acd5-450a-9961-3ffba92f20e6';

    DELETE FROM
      clinic.doctors
    WHERE
      user_id = '21ed452e-b3da-47d6-bd0c-8abea993cf0b';

    COMMIT;
    `);
  }
}
