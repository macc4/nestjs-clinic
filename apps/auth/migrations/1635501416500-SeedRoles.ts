import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1635501416500 implements MigrationInterface {
  name = 'SeedRoles1635501416500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO auth.role (id, title) 
    VALUES 
      ('1', 'admin');

    INSERT INTO auth.role (id, title) 
    VALUES 
      ('2', 'doctor');
      
    INSERT INTO auth.role (id, title) 
    VALUES 
      ('3', 'patient');
        
    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      auth.role
    WHERE
      id = 1;

    DELETE FROM
      auth.role
    WHERE
      id = 2;

    DELETE FROM
      auth.role
    WHERE
      id = 3;

    COMMIT;
    `);
  }
}
