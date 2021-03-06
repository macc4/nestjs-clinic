import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfilesTable1635500010003 implements MigrationInterface {
  name = 'CreateProfilesTable1635500010003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE profile.profiles
    (
      id SERIAL NOT NULL, 
      first_name character varying NOT NULL, 
      last_name character varying NOT NULL, 
      gender character varying NOT NULL, 
      birth_date timestamp with time zone NOT NULL,
      avatar_url character varying,
      user_id uuid NOT NULL, 
      CONSTRAINT UQ_profile_user_id UNIQUE (user_id), 
      CONSTRAINT PK_profile_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE profile.profiles
    `);
  }
}
