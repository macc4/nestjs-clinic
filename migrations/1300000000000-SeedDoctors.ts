import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDoctors1300000000000 implements MigrationInterface {
  name = 'SeedDoctors1300000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `user`(`id`, `email`, `password`) VALUES ('3a3aaf37-8efa-4f62-a62f-07adf8d5c421', 'doctor1@gmail.com', '$2b$10$SWRtsCYzKd8xINzM/hEBpOYibwMOFyHq59g3mn1l9H2aE/ZL.gHwC');",
    );
    await queryRunner.query(
      "INSERT INTO `user`(`id`, `email`, `password`) VALUES ('a6641003-0703-46c1-a04c-d6043f4ab3d5', 'doctor2@gmail.com', '$2b$10$SWRtsCYzKd8xINzM/hEBpOYibwMOFyHq59g3mn1l9H2aE/ZL.gHwC');",
    );
    await queryRunner.query(
      "INSERT INTO `user`(`id`, `email`, `password`) VALUES ('c1d5ed86-2d1e-4c07-9b53-900d657ab155', 'doctor3@gmail.com', '$2b$10$SWRtsCYzKd8xINzM/hEBpOYibwMOFyHq59g3mn1l9H2aE/ZL.gHwC');",
    );
    await queryRunner.query(
      "INSERT INTO `user_roles_role`(`userId`, `roleId`) VALUES ('3a3aaf37-8efa-4f62-a62f-07adf8d5c421', '3');",
    );
    await queryRunner.query(
      "INSERT INTO `user_roles_role`(`userId`, `roleId`) VALUES ('a6641003-0703-46c1-a04c-d6043f4ab3d5', '3');",
    );
    await queryRunner.query(
      "INSERT INTO `user_roles_role`(`userId`, `roleId`) VALUES ('c1d5ed86-2d1e-4c07-9b53-900d657ab155', '3');",
    );
    await queryRunner.query(
      `INSERT INTO \`doctor\` (\`id\`, \`name\`, \`gender\`, \`userId\`) VALUES (1, 'Vlada', 'female', '3a3aaf37-8efa-4f62-a62f-07adf8d5c421');`,
    );
    await queryRunner.query(
      `INSERT INTO \`doctor\` (\`id\`, \`name\`, \`gender\`, \`userId\`) VALUES (2, 'Max', 'male', 'a6641003-0703-46c1-a04c-d6043f4ab3d5');`,
    );
    await queryRunner.query(
      `INSERT INTO \`doctor\` (\`id\`, \`name\`, \`gender\`, \`userId\`) VALUES (3, 'Nikolaj', 'non-binary', 'c1d5ed86-2d1e-4c07-9b53-900d657ab155');`,
    );
    await queryRunner.query(
      `INSERT INTO \`doctor_specializations_specialization\` (\`doctorId\`, \`specializationId\`) VALUES (1, 1);`,
    );
    await queryRunner.query(
      `INSERT INTO \`doctor_specializations_specialization\` (\`doctorId\`, \`specializationId\`) VALUES (2, 2);`,
    );
    await queryRunner.query(
      `INSERT INTO \`doctor_specializations_specialization\` (\`doctorId\`, \`specializationId\`) VALUES (3, 3);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`doctor_specializations_specialization\`
       WHERE doctorId=1`,
    );
    await queryRunner.query(
      `DELETE FROM \`doctor_specializations_specialization\`
       WHERE doctorId=2`,
    );
    await queryRunner.query(
      `DELETE FROM \`doctor_specializations_specialization\`
       WHERE doctorId=3`,
    );
    await queryRunner.query(
      `DELETE FROM \`doctor\`
       WHERE id=1;`,
    );
    await queryRunner.query(
      `DELETE FROM \`doctor\`
       WHERE id=2;`,
    );
    await queryRunner.query(
      `DELETE FROM \`doctor\`
       WHERE id=3;`,
    );
    await queryRunner.query(
      `DELETE FROM \`user_roles_role\`
       WHERE userId='3a3aaf37-8efa-4f62-a62f-07adf8d5c421';`,
    );
    await queryRunner.query(
      `DELETE FROM \`user_roles_role\`
       WHERE userId='a6641003-0703-46c1-a04c-d6043f4ab3d5';`,
    );
    await queryRunner.query(
      `DELETE FROM \`user_roles_role\`
       WHERE userId='c1d5ed86-2d1e-4c07-9b53-900d657ab155';`,
    );
    await queryRunner.query(
      `DELETE FROM \`user\`
       WHERE id='3a3aaf37-8efa-4f62-a62f-07adf8d5c421';`,
    );
    await queryRunner.query(
      `DELETE FROM \`user\`
       WHERE id='a6641003-0703-46c1-a04c-d6043f4ab3d5';`,
    );
    await queryRunner.query(
      `DELETE FROM \`user\`
       WHERE id='c1d5ed86-2d1e-4c07-9b53-900d657ab155';`,
    );
  }
}
