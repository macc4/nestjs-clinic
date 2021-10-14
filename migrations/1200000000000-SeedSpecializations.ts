import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedSpecializations1200000000000 implements MigrationInterface {
  name = 'SeedSpecializations1200000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO `specialization`(`id`, `title`) VALUES ('1', 'dermatologist');",
    );
    await queryRunner.query(
      "INSERT INTO `specialization`(`id`, `title`) VALUES ('2', 'psychiatrist');",
    );
    await queryRunner.query(
      "INSERT INTO `specialization`(`id`, `title`) VALUES ('3', 'therapist');",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DELETE FROM \`specialization\`
       WHERE id=1;`,
    );
    await queryRunner.query(
      `DELETE FROM \`specialization\`
       WHERE id=2;`,
    );
    await queryRunner.query(
      `DELETE FROM \`specialization\`
       WHERE id=3;`,
    );
  }
}
