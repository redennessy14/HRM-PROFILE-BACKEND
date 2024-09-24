import { MigrationInterface, QueryRunner } from "typeorm";

export class Profile1723205577007 implements MigrationInterface {
    name = 'Profile1723205577007'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "leave_counts" ("employee_id" uuid NOT NULL, "vacation_days" numeric(10,2) NOT NULL DEFAULT '0', "hospital_days" integer NOT NULL DEFAULT '0', "family_days" integer NOT NULL DEFAULT '0', "day_off" integer NOT NULL DEFAULT '0', "used_days" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_d443f06f6ec465489d322a502f5" PRIMARY KEY ("employee_id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "about_me" character varying, "role" character varying, "birthday" character varying, "hired_at" character varying, "phone" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"), CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."leave_request_type_enum" AS ENUM('family', 'vacation', 'hospital', 'day_off')`);
        await queryRunner.query(`CREATE TABLE "leave_request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."leave_request_type_enum" NOT NULL, "startDate" TIMESTAMP NOT NULL, "endDate" TIMESTAMP NOT NULL, "days_count" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "employeeId" uuid, CONSTRAINT "PK_6f6ed3822203a4e10a5753368db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."approvals_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "approvals" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" "public"."approvals_status_enum" NOT NULL DEFAULT 'pending', "approverId" uuid NOT NULL, CONSTRAINT "PK_690417aaefa84d18b1a59e2a499" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "leave_request_approvals" ("leave_request_id" uuid NOT NULL, "approver_id" uuid NOT NULL, CONSTRAINT "PK_6cd37d2c4c371edf86616649ac1" PRIMARY KEY ("leave_request_id", "approver_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1b3354f3879c4eb2d0639ed093" ON "leave_request_approvals" ("leave_request_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_07704f8a055e73bf37935419b8" ON "leave_request_approvals" ("approver_id") `);
        await queryRunner.query(`ALTER TABLE "leave_counts" ADD CONSTRAINT "FK_d443f06f6ec465489d322a502f5" FOREIGN KEY ("employee_id") REFERENCES "employee"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD CONSTRAINT "FK_03889549dbbc56e2a9f5ce107a0" FOREIGN KEY ("employeeId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "approvals" ADD CONSTRAINT "FK_f5287ff42fc3f68220c38e6c3cd" FOREIGN KEY ("approverId") REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "leave_request_approvals" ADD CONSTRAINT "FK_1b3354f3879c4eb2d0639ed0934" FOREIGN KEY ("leave_request_id") REFERENCES "leave_request"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "leave_request_approvals" ADD CONSTRAINT "FK_07704f8a055e73bf37935419b8e" FOREIGN KEY ("approver_id") REFERENCES "approvals"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request_approvals" DROP CONSTRAINT "FK_07704f8a055e73bf37935419b8e"`);
        await queryRunner.query(`ALTER TABLE "leave_request_approvals" DROP CONSTRAINT "FK_1b3354f3879c4eb2d0639ed0934"`);
        await queryRunner.query(`ALTER TABLE "approvals" DROP CONSTRAINT "FK_f5287ff42fc3f68220c38e6c3cd"`);
        await queryRunner.query(`ALTER TABLE "leave_request" DROP CONSTRAINT "FK_03889549dbbc56e2a9f5ce107a0"`);
        await queryRunner.query(`ALTER TABLE "leave_counts" DROP CONSTRAINT "FK_d443f06f6ec465489d322a502f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_07704f8a055e73bf37935419b8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b3354f3879c4eb2d0639ed093"`);
        await queryRunner.query(`DROP TABLE "leave_request_approvals"`);
        await queryRunner.query(`DROP TABLE "approvals"`);
        await queryRunner.query(`DROP TYPE "public"."approvals_status_enum"`);
        await queryRunner.query(`DROP TABLE "leave_request"`);
        await queryRunner.query(`DROP TYPE "public"."leave_request_type_enum"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "leave_counts"`);
    }

}
