import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSpecializations1635501416500 implements MigrationInterface {
  name = 'SeedSpecializations1635501416500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO clinic.specialization (id, title) 
    VALUES 
      ('1', 'dermatoligst');

    INSERT INTO clinic.specialization (id, title) 
    VALUES 
      ('2', 'psychiatrist');
      
    INSERT INTO clinic.specialization (id, title) 
    VALUES 
      ('3', 'traumatologist');
        
    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      clinic.specialization
    WHERE
      id = 3;

    DELETE FROM
      clinic.specialization
    WHERE
      id = 2;

    DELETE FROM
      clinic.specialization
    WHERE
      id = 1;

    COMMIT;
    `);
  }
}
