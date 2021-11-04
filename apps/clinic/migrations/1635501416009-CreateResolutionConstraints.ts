import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResolutionConstraints1635501416009
  implements MigrationInterface
{
  name = 'CreateResolutionConstraints1635501416009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      clinic.resolution 
    ADD 
      CONSTRAINT FK_resolution_doctor_id FOREIGN KEY (doctor_id) REFERENCES clinic.doctor(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.resolution 
    ADD 
      CONSTRAINT FK_resolution_patient_id FOREIGN KEY (patient_id) REFERENCES clinic.patient(id) ON DELETE NO ACTION ON UPDATE NO ACTION

    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE clinic.resolution DROP CONSTRAINT FK_resolution_patient_id
    `);

    await queryRunner.query(`
    ALTER TABLE clinic.resolution DROP CONSTRAINT FK_resolution_doctor_id
    `);
  }
}
