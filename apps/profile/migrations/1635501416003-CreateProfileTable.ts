import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProfileTable1635501416003 implements MigrationInterface {
  name = 'CreateProfileTable1635501416003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE profile.profile 
    (
      id SERIAL NOT NULL, 
      name character varying NOT NULL, 
      gender character varying NOT NULL, 
      user_id uuid NOT NULL, 
      CONSTRAINT UQ_profile_user_id UNIQUE (user_id), 
      CONSTRAINT PK_profile_id PRIMARY KEY (id)
    );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE profile.profile
    `);
  }
}
