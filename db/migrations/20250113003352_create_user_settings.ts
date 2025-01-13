import type { Knex } from 'knex';
import { KeyboardType } from '../../src/@types/enums';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('user_settings', table => {
    table.increments('id').primary();
    table
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.boolean('dark_mode').defaultTo(false);
    table.string('locale').defaultTo('en');
    table.enu('keyboard_type', Object.values(KeyboardType)).defaultTo(KeyboardType.US);
    table.boolean('show_tips').defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('user_settings');
}
