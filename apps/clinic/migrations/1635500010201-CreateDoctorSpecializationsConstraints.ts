import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDoctorSpecializationsConstraints1635500010201
  implements MigrationInterface
{
  name = 'CreateDoctorSpecializationsConstraints1635500010201';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      clinic.doctor_specializations 
    ADD 
      CONSTRAINT FK_doctor_specializations_doctor_id FOREIGN KEY (doctor_id) REFERENCES clinic.doctors(id) ON DELETE CASCADE ON UPDATE CASCADE
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.doctor_specializations 
    ADD 
      CONSTRAINT FK_doctor_specializations_specialization_id FOREIGN KEY (specialization_id) REFERENCES clinic.specializations
      (id) ON DELETE CASCADE ON UPDATE CASCADE
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
