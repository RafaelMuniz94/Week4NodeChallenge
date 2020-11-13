import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CriacaoTabelaCustomers1605055373012 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "customers",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          }, //string
          { name: "name", type: "varchar", isNullable: false }, //string;
          { name: "email", type: "varchar", isNullable: false }, //string;
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
      await queryRunner.dropTable('customers')
  }
}
