import * as dotenv from 'dotenv';
import { Knex } from 'knex';
import { faker } from '@faker-js/faker';
import { KeyboardType } from '../../src/@types/enums';

dotenv.config();

const tableName = 'user_settings';
const keyboardTypes = Object.values(KeyboardType);

export async function seed(knex: Knex): Promise<void> {
  const users = await knex('users').select('id');
  await knex(tableName).del();
  const settings = users.map(({ id }) => ({
    user_id: id,
    dark_mode: faker.datatype.boolean(),
    show_tips: faker.datatype.boolean(),
    locale: 'en',
    keyboard_type: keyboardTypes[faker.number.int({ max: keyboardTypes.length - 1 })],
  }));
  await knex(tableName).insert(settings);
}
