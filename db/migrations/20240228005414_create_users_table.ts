import type { Knex } from 'knex';
import { Role } from '../../src/@types';

const tableName = 'users';
export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table.string('email').unique().notNullable();
    table.string('username').unique().notNullable();
    table.string('first_name');
    table.string('last_name');
    table.date('date_of_birth');
    table.string('bio', 300);
    table.string('nationality');
    table.string('password').notNullable();
    table.enu('role', Object.values(Role)).defaultTo(Role.User);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(tableName);
}
