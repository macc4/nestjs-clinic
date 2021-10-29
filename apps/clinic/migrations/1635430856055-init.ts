import {MigrationInterface, QueryRunner} from "typeorm";

export class test1635430856055 implements MigrationInterface {
    name = 'test1635430856055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_6636aefca0bdad8933c7cc3e394" UNIQUE ("userId"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resolution" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "expiry" TIMESTAMP, "patientId" integer NOT NULL, "doctorId" integer, CONSTRAINT "PK_2a6383d82766ccd2a9e6163306d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specialization" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_45d301d8f0ac9bb7e0e5e3f6adb" UNIQUE ("title"), CONSTRAINT "PK_904dfcbdb57f56f5b57b9c09cc5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor" ("id" SERIAL NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_e573a17ab8b6eea2b7fe9905fa8" UNIQUE ("userId"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, "userId" character varying NOT NULL, CONSTRAINT "UQ_a24972ebd73b106250713dcddd9" UNIQUE ("userId"), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "role" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "UQ_4a74ca47fe1aa34a28a6db3c722" UNIQUE ("title"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "doctor_specializations_specialization" ("doctorId" integer NOT NULL, "specializationId" integer NOT NULL, CONSTRAINT "PK_192840cd7580975853cb6b6fc56" PRIMARY KEY ("doctorId", "specializationId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1502e9d876015276542164b550" ON "doctor_specializations_specialization" ("doctorId") `);
        await queryRunner.query(`CREATE INDEX "IDX_89f820eccb46a3ae4740399051" ON "doctor_specializations_specialization" ("specializationId") `);
        await queryRunner.query(`CREATE TABLE "user_roles_role" ("userId" uuid NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "PK_b47cd6c84ee205ac5a713718292" PRIMARY KEY ("userId", "roleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `);
        await queryRunner.query(`ALTER TABLE "resolution" ADD CONSTRAINT "FK_0cd91a2e4a9c20f1675503dccfe" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "resolution" ADD CONSTRAINT "FK_2f6d685a47cea653fe441a1a1ee" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "doctor_specializations_specialization" ADD CONSTRAINT "FK_1502e9d876015276542164b5506" FOREIGN KEY ("doctorId") REFERENCES "doctor"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "doctor_specializations_specialization" ADD CONSTRAINT "FK_89f820eccb46a3ae47403990516" FOREIGN KEY ("specializationId") REFERENCES "specialization"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" ADD CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_4be2f7adf862634f5f803d246b8"`);
        await queryRunner.query(`ALTER TABLE "user_roles_role" DROP CONSTRAINT "FK_5f9286e6c25594c6b88c108db77"`);
        await queryRunner.query(`ALTER TABLE "doctor_specializations_specialization" DROP CONSTRAINT "FK_89f820eccb46a3ae47403990516"`);
        await queryRunner.query(`ALTER TABLE "doctor_specializations_specialization" DROP CONSTRAINT "FK_1502e9d876015276542164b5506"`);
        await queryRunner.query(`ALTER TABLE "resolution" DROP CONSTRAINT "FK_2f6d685a47cea653fe441a1a1ee"`);
        await queryRunner.query(`ALTER TABLE "resolution" DROP CONSTRAINT "FK_0cd91a2e4a9c20f1675503dccfe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4be2f7adf862634f5f803d246b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5f9286e6c25594c6b88c108db7"`);
        await queryRunner.query(`DROP TABLE "user_roles_role"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_89f820eccb46a3ae4740399051"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1502e9d876015276542164b550"`);
        await queryRunner.query(`DROP TABLE "doctor_specializations_specialization"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "role"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "doctor"`);
        await queryRunner.query(`DROP TABLE "specialization"`);
        await queryRunner.query(`DROP TABLE "resolution"`);
        await queryRunner.query(`DROP TABLE "patient"`);
    }

}
