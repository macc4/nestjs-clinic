import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctorUsers1635501416501 implements MigrationInterface {
  name = 'SeedDoctorUsers1635501416501';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO auth.user (id, email, password) 
    VALUES 
      ('21ed452e-b3da-47d6-bd0c-8abea993cf0b', 'doctor1@gmail.com', '$2b$10$yZKWc8wSfvts9NYt3YbAB.7/GDPqH9KBGcrcpqeNwFo9PDW0YfrGi');

    INSERT INTO auth.user (id, email, password) 
    VALUES 
      ('abd9a3f6-acd5-450a-9961-3ffba92f20e6', 'doctor2@gmail.com', '$2b$10$yZKWc8wSfvts9NYt3YbAB.7/GDPqH9KBGcrcpqeNwFo9PDW0YfrGi');

    INSERT INTO auth.user (id, email, password) 
    VALUES 
      ('c1414d7c-cd5d-4d1a-9c29-7311bb21c884', 'doctor3@gmail.com', '$2b$10$yZKWc8wSfvts9NYt3YbAB.7/GDPqH9KBGcrcpqeNwFo9PDW0YfrGi');
      
    INSERT INTO auth.user_roles (user_id, role_id) 
    VALUES 
      ('21ed452e-b3da-47d6-bd0c-8abea993cf0b', '2');

    INSERT INTO auth.user_roles (user_id, role_id) 
    VALUES 
      ('abd9a3f6-acd5-450a-9961-3ffba92f20e6', '2');

    INSERT INTO auth.user_roles (user_id, role_id) 
    VALUES 
      ('c1414d7c-cd5d-4d1a-9c29-7311bb21c884', '2');

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      auth.user_roles
    WHERE
      user_id = 'c1414d7c-cd5d-4d1a-9c29-7311bb21c884';

    DELETE FROM
      auth.user_roles
    WHERE
      user_id = 'abd9a3f6-acd5-450a-9961-3ffba92f20e6';

    DELETE FROM
      auth.user_roles
    WHERE
      user_id = '21ed452e-b3da-47d6-bd0c-8abea993cf0b';

    DELETE FROM
      auth.user
    WHERE
      id = 'c1414d7c-cd5d-4d1a-9c29-7311bb21c884';

    DELETE FROM
      auth.user
    WHERE
      id = 'abd9a3f6-acd5-450a-9961-3ffba92f20e6';

    DELETE FROM
      auth.user
    WHERE
      id = '21ed452e-b3da-47d6-bd0c-8abea993cf0b';

    COMMIT;
    `);
  }
}
