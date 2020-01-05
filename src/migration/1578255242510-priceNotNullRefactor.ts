import { MigrationInterface, QueryRunner } from 'typeorm';

export class priceNotNullRefactor1578255242510 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "product_producer" ALTER COLUMN price SET NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`ALTER TABLE "product_producer" ALTER COLUMN price SET NULL`);

  }

}
