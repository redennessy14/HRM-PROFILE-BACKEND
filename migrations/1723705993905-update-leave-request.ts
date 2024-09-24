import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateLeaveRequest1723705993905 implements MigrationInterface {
    name = 'UpdateLeaveRequest1723705993905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."leave_request_status_enum" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "leave_request" ADD "status" "public"."leave_request_status_enum" NOT NULL DEFAULT 'pending'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "leave_request" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."leave_request_status_enum"`);
    }

}
