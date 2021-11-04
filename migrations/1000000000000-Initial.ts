import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1000000000000 implements MigrationInterface {
  name = 'Initial1000000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_4a74ca47fe1aa34a28a6db3c72\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` char(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`userId\` char(36) NULL, UNIQUE INDEX \`REL_6636aefca0bdad8933c7cc3e39\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`resolution\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`expiry\` datetime NULL, \`patientId\` int NOT NULL, \`doctorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`specialization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_45d301d8f0ac9bb7e0e5e3f6ad\` (\`title\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`userId\` char(36) NULL, UNIQUE INDEX \`REL_e573a17ab8b6eea2b7fe9905fa\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user_roles_role\` (\`userId\` char(36) NOT NULL, \`roleId\` int NOT NULL, INDEX \`IDX_5f9286e6c25594c6b88c108db7\` (\`userId\`), INDEX \`IDX_4be2f7adf862634f5f803d246b\` (\`roleId\`), PRIMARY KEY (\`userId\`, \`roleId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctor_specializations_specialization\` (\`doctorId\` int NOT NULL, \`specializationId\` int NOT NULL, INDEX \`IDX_1502e9d876015276542164b550\` (\`doctorId\`), INDEX \`IDX_89f820eccb46a3ae4740399051\` (\`specializationId\`), PRIMARY KEY (\`doctorId\`, \`specializationId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`FK_6636aefca0bdad8933c7cc3e394\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` ADD CONSTRAINT \`FK_0cd91a2e4a9c20f1675503dccfe\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` ADD CONSTRAINT \`FK_2f6d685a47cea653fe441a1a1ee\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` ADD CONSTRAINT \`FK_e573a17ab8b6eea2b7fe9905fa8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_5f9286e6c25594c6b88c108db77\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` ADD CONSTRAINT \`FK_4be2f7adf862634f5f803d246b8\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor_specializations_specialization\` ADD CONSTRAINT \`FK_1502e9d876015276542164b5506\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor_specializations_specialization\` ADD CONSTRAINT \`FK_89f820eccb46a3ae47403990516\` FOREIGN KEY (\`specializationId\`) REFERENCES \`specialization\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`doctor_specializations_specialization\` DROP FOREIGN KEY \`FK_89f820eccb46a3ae47403990516\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor_specializations_specialization\` DROP FOREIGN KEY \`FK_1502e9d876015276542164b5506\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_4be2f7adf862634f5f803d246b8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_roles_role\` DROP FOREIGN KEY \`FK_5f9286e6c25594c6b88c108db77\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`FK_e573a17ab8b6eea2b7fe9905fa8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` DROP FOREIGN KEY \`FK_2f6d685a47cea653fe441a1a1ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` DROP FOREIGN KEY \`FK_0cd91a2e4a9c20f1675503dccfe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`FK_6636aefca0bdad8933c7cc3e394\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_89f820eccb46a3ae4740399051\` ON \`doctor_specializations_specialization\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1502e9d876015276542164b550\` ON \`doctor_specializations_specialization\``,
    );
    await queryRunner.query(
      `DROP TABLE \`doctor_specializations_specialization\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_4be2f7adf862634f5f803d246b\` ON \`user_roles_role\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_5f9286e6c25594c6b88c108db7\` ON \`user_roles_role\``,
    );
    await queryRunner.query(`DROP TABLE \`user_roles_role\``);
    await queryRunner.query(
      `DROP INDEX \`REL_e573a17ab8b6eea2b7fe9905fa\` ON \`doctor\``,
    );
    await queryRunner.query(`DROP TABLE \`doctor\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_45d301d8f0ac9bb7e0e5e3f6ad\` ON \`specialization\``,
    );
    await queryRunner.query(`DROP TABLE \`specialization\``);
    await queryRunner.query(`DROP TABLE \`resolution\``);
    await queryRunner.query(
      `DROP INDEX \`REL_6636aefca0bdad8933c7cc3e39\` ON \`patient\``,
    );
    await queryRunner.query(`DROP TABLE \`patient\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_4a74ca47fe1aa34a28a6db3c72\` ON \`role\``,
    );
    await queryRunner.query(`DROP TABLE \`role\``);
  }
}
