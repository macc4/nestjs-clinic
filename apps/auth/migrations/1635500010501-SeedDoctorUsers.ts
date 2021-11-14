import { doctorUUIDs } from '@macc4-clinic/common';
import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctorUsers1635500010500 implements MigrationInterface {
  name = 'SeedDoctorUsers1635500010500';

  private wrapTransactionQuery(query: string): string {
    const returnQuery = `
    BEGIN;
    ${query}
    COMMIT;`;

    return returnQuery;
  }

  private createOneUpQuery(number: number): string {
    const query = `
    INSERT INTO auth.users (id, email, password) 
    VALUES 
      ('${doctorUUIDs[number]}', 'doctor${
      number + 1
    }@gmail.com', '$2b$10$yZKWc8wSfvts9NYt3YbAB.7/GDPqH9KBGcrcpqeNwFo9PDW0YfrGi');

    INSERT INTO auth.user_roles (user_id, role_id) 
    VALUES 
      ('${doctorUUIDs[number]}', '2');
    `;

    return query;
  }

  private createOneDownQuery(number: number): string {
    const query = `
    DELETE FROM
      auth.user_roles
    WHERE
      user_id = '${doctorUUIDs[number]}';
      
    DELETE FROM
      auth.users
    WHERE
      id = '${doctorUUIDs[number]}';
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
