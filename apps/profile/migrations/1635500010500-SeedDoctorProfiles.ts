import { MigrationInterface, QueryRunner } from 'typeorm';
import * as faker from 'faker';
import { doctorUUIDs } from '@macc4-clinic/common';

export class SeedDoctorProfiles1635500010500 implements MigrationInterface {
  name = 'SeedDoctorProfiles1635500010500';

  private getRandomGender(): string {
    const genders = ['male', 'female'];

    const randomGender = genders[Math.floor(Math.random() * genders.length)];

    return randomGender;
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
    INSERT INTO profile.profiles (first_name, last_name, gender, birth_date, user_id) 
    VALUES 
      ('${faker.name.firstName()}', '${faker.name
      .lastName()
      .replace("'", '"')}', '${this.getRandomGender()}', '${new Date(
      faker.date.past(),
    ).toISOString()}', '${doctorUUIDs[number]}');
    `;

    return query;
  }

  private createOneDownQuery(number: number): string {
    const query = `
    DELETE FROM
      profile.profiles
    WHERE
      user_id = '${doctorUUIDs[number]}';
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
