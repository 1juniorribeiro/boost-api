import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateClients1618338666385 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'clients',
          columns: [
            {
              name: 'id',
              type: 'uuid',
            },
            {
              name: 'name',
              type: 'varchar',
            },
            {
              name: 'phone',
              type: 'bigint',
              isUnique: true,
            },
            {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
            },
            {
              name: 'updated_at',
              type: 'timestamp',
              default: 'now()'
            }
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('clients')
    }

}
