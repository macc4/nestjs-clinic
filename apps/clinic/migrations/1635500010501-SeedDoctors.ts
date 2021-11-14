import { doctorUUIDs } from '@macc4-clinic/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctors1635500010501 implements MigrationInterface {
  name = 'SeedDoctors1635500010501';

  private getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
  }

  private wrapTransactionQuery(query: string): string {
    const returnQuery = `
    BEGIN;
    ${query}
    COMMIT;`;

    return returnQuery;
  }

  private createOneUpQuery(number: number): string {
    const query = `
    INSERT INTO clinic.doctors (id, user_id) 
    VALUES 
      ('${number + 1}', '${doctorUUIDs[number]}');

    INSERT INTO clinic.doctor_specializations (doctor_id, specialization_id) 
    VALUES 
      ('${number + 1}', '${this.getRandomInt(3) + 1}');
    `;

    return query;
  }

  private createOneDownQuery(number: number): string {
    const query = `
    DELETE FROM
      clinic.doctors
    WHERE
      user_id = '${doctorUUIDs[number]}';

    DELETE FROM
      clinic.doctor_specializations
    WHERE
      doctor_id = ${number + 1};
    `;

    return query;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query = '';

    for (let i = 0; i < 100; i++) {
      query += this.createOneUpQuery(i);
    }

    await queryRunner.query(this.wrapTransactionQuery(query));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let query = '';

    for (let i = 0; i < 100; i++) {
      query += this.createOneDownQuery(i);
    }

    await queryRunner.query(this.wrapTransactionQuery(query));
  }
}
