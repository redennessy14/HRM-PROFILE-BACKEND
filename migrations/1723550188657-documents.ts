import { MigrationInterface, QueryRunner } from "typeorm";

export class Documents1723550188657 implements MigrationInterface {
    name = 'Documents1723550188657'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."document_type_enum" AS ENUM('passport', 'employment_contract', 'resume', 'monthly_report', 'work_completion_act')`);
        await queryRunner.query(`CREATE TABLE "document" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "profile_id" character varying NOT NULL, "type" "public"."document_type_enum" NOT NULL, "file_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TYPE "public"."document_type_enum"`);
    }

}
