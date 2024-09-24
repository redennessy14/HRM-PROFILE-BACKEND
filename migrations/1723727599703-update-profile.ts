import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateProfile1723727599703 implements MigrationInterface {
    name = 'UpdateProfile1723727599703'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "avatar" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "avatar"`);
    }

}
