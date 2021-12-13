import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAppointments1635500010503 implements MigrationInterface {
  name = 'SeedAppointments1635500010503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
    INSERT INTO clinic.appointments 
    SELECT 
      generate_series(1, 1000000) AS id, 
      md5(
        random():: text
      ) AS reason, 
      md5(
        random():: text
      ) AS note, 
      current_timestamp AS visit_date, 
      (
        trunc(
          random()* 9 + 1
        )
      ):: integer AS doctor_id, 
      (
        trunc(
          random()* 9 + 1
        )
      ):: integer AS patient_id
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `
    DELETE from 
      clinic.appointments using generate_series(1, 1000000) idx 
    WHERE 
      id = idx
    `;

    await queryRunner.query(query);
  }
}
