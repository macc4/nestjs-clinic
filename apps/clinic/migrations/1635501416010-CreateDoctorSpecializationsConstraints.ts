import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorSpecializationsConstraints1635501416010
  implements MigrationInterface
{
  name = 'CreateDoctorSpecializationsConstraints1635501416010';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      clinic.doctor_specializations 
    ADD 
      CONSTRAINT FK_doctor_specializations_doctor_id FOREIGN KEY (doctor_id) REFERENCES clinic.doctor(id) ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.doctor_specializations 
    ADD 
      CONSTRAINT FK_doctor_specializations_specialization_id FOREIGN KEY (specialization_id) REFERENCES clinic.specialization(id) ON DELETE CASCADE ON UPDATE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      clinic.doctor_specializations 
    DROP 
      CONSTRAINT FK_doctor_specializations_specialization_id
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.doctor_specializations 
    DROP 
      CONSTRAINT FK_doctor_specializations_doctor_id
    `);
  }
}
