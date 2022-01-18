// import { patientUUIDs } from '@macc4-clinic/common';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class SeedPatientUsers1635500010502 implements MigrationInterface {
//   name = 'SeedPatientUsers1635500010502';

//   private createOneUpQuery(
//     number: number,
//     totalQueriesIncrement: number,
//     array: string[],
//   ): string {
//     const query = `
//     INSERT INTO auth.users (id, email, password)
//     VALUES
//       ('${array[number]}', 'patient${
//       totalQueriesIncrement + 1
//     }@gmail.com', '$2b$10$yZKWc8wSfvts9NYt3YbAB.7/GDPqH9KBGcrcpqeNwFo9PDW0YfrGi');

//     INSERT INTO auth.user_roles (user_id, role_id)
//     VALUES
//       ('${array[number]}', '3');
//     `;

//     return query;
//   }

//   private createOneDownQuery(number: number, array: string[]): string {
//     const query = `
//     DELETE FROM
//       auth.user_roles
//     WHERE
//       user_id = '${array[number]}';

//     DELETE FROM
//       auth.users
//     WHERE
//       id = '${array[number]}';
//     `;

//     return query;
//   }

//   private createUpChunkQuery(chunkIncrement: number, array: string[]): string {
//     let query = '';

//     let singleQueryIncrement = chunkIncrement * array.length;

//     for (let i = 0; i < array.length; i++) {
//       singleQueryIncrement += 1;
//       query += this.createOneUpQuery(i, singleQueryIncrement, array);
//     }

//     return query;
//   }

//   private createDownChunkQuery(array: string[]): string {
//     let query = '';

//     for (let i = 0; i < array.length; i++) {
//       query += this.createOneDownQuery(i, array);
//     }

//     return query;
//   }

//   public async up(queryRunner: QueryRunner): Promise<void> {
//     const chunkSize = 5000;

//     let chunkIncrement = 0;

//     for (let i = 0; i < patientUUIDs.length; i += chunkSize) {
//       const chunk = patientUUIDs.slice(i, i + chunkSize);

//       const query = this.createUpChunkQuery(chunkIncrement, chunk);

//       chunkIncrement += 1;

//       await queryRunner.query(query);
//     }
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     const chunkSize = 5000;

//     for (let i = 0; i < patientUUIDs.length; i += chunkSize) {
//       const chunk = patientUUIDs.slice(i, i + chunkSize);

//       const query = this.createDownChunkQuery(chunk);

//       await queryRunner.query(query);
//     }
//   }
// }
