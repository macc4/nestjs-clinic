import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRoles1635500010500 implements MigrationInterface {
  name = 'SeedRoles1635500010500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO auth.roles (id, title) 
    VALUES 
      ('1', 'admin');

    INSERT INTO auth.roles (id, title) 
    VALUES 
      ('2', 'doctor');
      
    INSERT INTO auth.roles (id, title) 
    VALUES 
      ('3', 'patient');
        
    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      auth.roles
    WHERE
      id = 1;

    DELETE FROM
      auth.roles
    WHERE
      id = 2;

    DELETE FROM
      auth.roles
    WHERE
      id = 3;

    COMMIT;
    `);
  }
}
