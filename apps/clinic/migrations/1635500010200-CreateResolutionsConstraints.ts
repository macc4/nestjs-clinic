import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateResolutionsConstraints1635500010200
  implements MigrationInterface
{
  name = 'CreateResolutionsConstraints1635500010200';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      clinic.resolutions 
    ADD 
      CONSTRAINT FK_resolutions_doctor_id FOREIGN KEY (doctor_id) REFERENCES clinic.doctors(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.resolutions 
    ADD 
      CONSTRAINT FK_resolutions_patient_id FOREIGN KEY (patient_id) REFERENCES clinic.patients(id) ON DELETE NO ACTION ON UPDATE NO ACTION

    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.resolutions 
    ADD 
      CONSTRAINT FK_resolutions_appointment_id FOREIGN KEY (appointment_id) REFERENCES clinic.appointments(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE clinic.resolutions DROP CONSTRAINT FK_resolutions_appointment_id
    `);

    await queryRunner.query(`
    ALTER TABLE clinic.resolutions DROP CONSTRAINT FK_resolutions_patient_id
    `);

    await queryRunner.query(`
    ALTER TABLE clinic.resolutions DROP CONSTRAINT FK_resolutions_doctor_id
    `);
  }
}
