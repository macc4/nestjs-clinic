import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSpecializations1635500010500 implements MigrationInterface {
  name = 'SeedSpecializations1635500010500';

  private specializations = [
    'allergist',
    'anesthesiologist',
    'cardiologist',
    'dermatologist',
    'endocrinologist',
    'gastroenterologist',
    'hematologist',
    'nephrologist',
    'obstetrician',
    'gynecologist',
    'oncologist',
    'ophtalmologist',
    'ostheopath',
    'otolaryngologist',
    'pediatrician',
    'podiatrist',
    'psychiatrist',
    'radiologist',
    'surgeon',
    'urologist',
  ];

  private wrapTransactionQuery(query: string): string {
    const returnQuery = `
    BEGIN;
    ${query}
    COMMIT;`;

    return returnQuery;
  }

  private createOneUpQuery(number: number): string {
    const query = `
    INSERT INTO clinic.specializations (title) 
    VALUES 
      ('${this.specializations[number]}');
    `;

    return query;
  }

  private createOneDownQuery(number: number): string {
    const query = `
    DELETE FROM
      clinic.specializations
    WHERE
      title = '${this.specializations[number]}';
    `;

    return query;
  }

  public async up(queryRunner: QueryRunner): Promise<void> {
    let query = '';

    for (let i = 0; i < this.specializations.length; i++) {
      query += this.createOneUpQuery(i);
    }

    await queryRunner.query(this.wrapTransactionQuery(query));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    let query = '';

    for (let i = 0; i < this.specializations.length; i++) {
      query += this.createOneDownQuery(i);
    }

    await queryRunner.query(this.wrapTransactionQuery(query));
  }
}
