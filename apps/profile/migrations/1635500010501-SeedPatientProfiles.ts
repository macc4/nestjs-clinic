// import { MigrationInterface, QueryRunner } from 'typeorm';
// import * as faker from 'faker';
// import { patientUUIDs } from '@macc4-clinic/common';

// export class SeedPatientProfiles1635500010501 implements MigrationInterface {
//   name = 'SeedPatientProfiles1635500010501';

//   private getRandomGender(): string {
//     const genders = ['male', 'female'];

//     const randomGender = genders[Math.floor(Math.random() * genders.length)];

//     return randomGender;
//   }

//   private createOneUpQuery(number: number, array: string[]): string {
//     const query = `
//     INSERT INTO profile.profiles (first_name, last_name, gender, birth_date, avatar_url, user_id)
//     VALUES
//       ('${faker.name.firstName().replace("'", '"')}', '${faker.name
//       .lastName()
//       .replace("'", '"')}', '${this.getRandomGender()}', '${new Date(
//       faker.date.past(),
//     ).toISOString()}', 'https://itrex-clinic-aleksei.s3.eu-north-1.amazonaws.com/avatars/default.jpg', '${
//       array[number]
//     }');
//     `;

//     return query;
//   }

//   private createOneDownQuery(number: number, array: string[]): string {
//     const query = `
//     DELETE FROM
//       profile.profiles
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
