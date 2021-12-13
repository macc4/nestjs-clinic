import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedAppointments1635500010504 implements MigrationInterface {
  name = 'SeedResolutions1635500010504';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const query = `
    INSERT INTO clinic.resolutions 
    SELECT 
      generate_series(1, 1000000) AS id, 
      md5(
        random():: text
      ) AS text, 
      (
        trunc(
          random()* 9 + 1
        )
      ):: integer AS doctor_id, 
      (
        trunc(
          random()* 9 + 1
        )
      ):: integer AS patient_id,
      generate_series(1, 1000000) as appointment_id
    `;

    await queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const query = `
    DELETE from 
      clinic.resolutions using generate_series(1, 1000000) idx 
    WHERE 
      id = idx
    `;

    await queryRunner.query(query);
  }
}
