// import { patientUUIDs } from '@macc4-clinic/common';
// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class SeedPatients1635500010502 implements MigrationInterface {
//   name = 'SeedPatients1635500010502';

//   private createOneUpQuery(number: number, array: string[]): string {
//     const query = `
//     INSERT INTO clinic.patients (user_id)
//     VALUES
//       ('${array[number]}');
//     `;

//     return query;
//   }

//   private createOneDownQuery(number: number, array: string[]): string {
//     const query = `
//     DELETE FROM
//       clinic.patients
//     WHERE
//       user_id = '${array[number]}';
//     `;

//     return query;
//   }

//   private createUpChunkQuery(array: string[]): string {
//     let query = '';

//     for (let i = 0; i < array.length; i++) {
//       query += this.createOneUpQuery(i, array);
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

//       const query = this.createUpChunkQuery(chunk);

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
