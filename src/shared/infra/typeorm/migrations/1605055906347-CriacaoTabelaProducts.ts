
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CriacaoTabelaProducts1605055906347 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name:"products",
            columns:[
                {name:"id",type:'uuid',isPrimary:true,generationStrategy:"uuid",default:"uuid_generate_v4()"},//: string}
                {name:"name",type:"varchar",isNullable:false},//: string}              
                {name:"price",type:"decimal",isNullable:false},//: number}              
                {name:"quantity",type:"int"},//: number}                           
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
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('products')
    }

}
