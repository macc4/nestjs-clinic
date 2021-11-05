import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAppointmentsConstrains1635500010202
  implements MigrationInterface
{
  name = 'CreateAppointmentsConstrains1635500010202';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE 
      clinic.appointments 
    ADD 
      CONSTRAINT FK_appointments_resolution_id FOREIGN KEY (resolution_id) REFERENCES clinic.resolutions(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.appointments 
    ADD 
      CONSTRAINT FK_appointments_doctor_id FOREIGN KEY (doctor_id) REFERENCES clinic.doctors(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);

    await queryRunner.query(`
    ALTER TABLE 
      clinic.appointments 
    ADD 
      CONSTRAINT FK_appointments_patient_id FOREIGN KEY (patient_id) REFERENCES clinic.patients(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    ALTER TABLE clinic.appointments DROP CONSTRAINT FK_appointments_patient_id
    `);

    await queryRunner.query(`
    ALTER TABLE clinic.appointments DROP CONSTRAINT FK_appointments_doctor_id
    `);

    await queryRunner.query(`
    ALTER TABLE clinic.appointments DROP CONSTRAINT FK_appointments_resolution_id
    `);
  }
}
