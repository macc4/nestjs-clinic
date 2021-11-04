import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctorProfiles1635501416500 implements MigrationInterface {
  name = 'SeedDoctorProfiles1635501416500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    INSERT INTO profile.profile (name, gender, user_id) 
    VALUES 
      ('Natasha Yelin Chang', 'female', '21ed452e-b3da-47d6-bd0c-8abea993cf0b');

    INSERT INTO profile.profile (name, gender, user_id) 
    VALUES 
      ('Laura Les', 'female', 'abd9a3f6-acd5-450a-9961-3ffba92f20e6');

    INSERT INTO profile.profile (name, gender, user_id) 
    VALUES 
      ('Valentin Strykalo', 'male', 'c1414d7c-cd5d-4d1a-9c29-7311bb21c884');

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN; 

    DELETE FROM
      profile.profile
    WHERE
      user_id = 'c1414d7c-cd5d-4d1a-9c29-7311bb21c884';

    DELETE FROM
      profile.profile
    WHERE
      user_id = 'abd9a3f6-acd5-450a-9961-3ffba92f20e6';

    DELETE FROM
      profile.profile
    WHERE
      user_id = '21ed452e-b3da-47d6-bd0c-8abea993cf0b';

    COMMIT;
    `);
  }
}
