import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSpecializationsTable1635501416003
  implements MigrationInterface
{
  name = 'CreateSpecializationsTable1635501416003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE clinic.specialization 
    (
      id SERIAL NOT NULL, 
      title character varying NOT NULL, 
      CONSTRAINT UQ_specialization_title UNIQUE (title), 
      CONSTRAINT PK_specialization_id PRIMARY KEY (id)
    );    
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DROP TABLE clinic.specialization;
    `);
  }
}
