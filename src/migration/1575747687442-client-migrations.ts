import {MigrationInterface, QueryRunner} from "typeorm";

export class clientMigrations1575747687442 implements MigrationInterface {
    name = 'clientMigrations1575747687442'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "client_personal_data" ("idClient" integer NOT NULL, "name" character varying NOT NULL, "surname" character varying NOT NULL, "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "email" character varying NOT NULL, "clientIdClient" integer, CONSTRAINT "REL_3edab1ecb3a36281d8bbdbade5" UNIQUE ("clientIdClient"), CONSTRAINT "PK_58db8532eb9194314f8383dec42" PRIMARY KEY ("idClient"))`, undefined);
        await queryRunner.query(`CREATE TABLE "client" ("idClient" SERIAL NOT NULL, "nick" character varying NOT NULL, "password" character varying NOT NULL, "registerDate" date NOT NULL, CONSTRAINT "PK_e0d2180aad656efbe751ee1ec99" PRIMARY KEY ("idClient"))`, undefined);
        await queryRunner.query(`ALTER TABLE "client_personal_data" ADD CONSTRAINT "FK_3edab1ecb3a36281d8bbdbade5f" FOREIGN KEY ("clientIdClient") REFERENCES "client"("idClient") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "client_personal_data" DROP CONSTRAINT "FK_3edab1ecb3a36281d8bbdbade5f"`, undefined);
        await queryRunner.query(`DROP TABLE "client"`, undefined);
        await queryRunner.query(`DROP TABLE "client_personal_data"`, undefined);
    }

}
