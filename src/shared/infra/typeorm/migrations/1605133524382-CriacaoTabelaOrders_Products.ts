import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CriacaoTabelaOrdersProducts1605133524382
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "orders_products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          }, //: string;
          { name: "product_id", type: "uuid" }, //: string;
          { name: "order_id", type: "uuid" }, //: string;
          { name: "price", type: "decimal", isNullable: false }, //: number}
          { name: "quantity", type: "int" }, //: number}
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          }, //: Date;
        ],
      })
    );

    await queryRunner.createForeignKey(
      "orders_products",
      new TableForeignKey({
        name: "OrdersProductsToProduct",
        columnNames: ["product_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "products",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "orders_products",
      new TableForeignKey({
        name: "OrdersProductsToOrder",
        columnNames: ["order_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "orders",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      "orders_products",
      "OrdersProductsToProduct"
    );
    await queryRunner.dropForeignKey(
      "orders_products",
      "OrdersProductsToOrder"
    );

    await queryRunner.dropTable("orders_products");
  }
}
