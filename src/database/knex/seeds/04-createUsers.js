const { hash } = require('bcryptjs');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del();
  await knex('users').insert([
    {
      id: 1,
      name: 'Admin',
      email: 'adm@admin.com',
      password: await hash('111xxx', 8),
    },
    {
      id: 2,
      name: 'User',
      email: 'user@user.com',
      password: await hash('222xxx', 8),
    },
  ]);
};
